import { useEffect, useState } from 'react';
import styles from './App.styles.module.css';
import AirportsList from './components/AirportsList/AirportsList';
import { airportsListByCodeRequest } from './utils/requests/airportsListByCodeRequest';
import { airportsListByNameRequest } from './utils/requests/airportsListByNameRequest';
import { airportsListRequest } from './utils/requests/airportsListRequest';
import { setAxiosInterceptor } from './utils/requests/requestUtils';
import { AirportData } from './utils/types';
import useDebounce from './utils/useDebounce';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [airportsList, setAirportsList] = useState<AirportData[]>([]);
  const [filteredAirportsList, setFilteredAirportsList] = useState<
    AirportData[]
  >([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    setAxiosInterceptor();
    getInitialAirportsList();
  }, []);

  const getInitialAirportsList = async () => {
    setIsLoading(true);
    const initialList = await airportsListRequest();
    setAirportsList(initialList);
    setFilteredAirportsList(initialList);
    setIsLoading(false);
  };

  const onSearch = (searchInput: string) => {
    if (!searchInput) {
      setFilteredAirportsList(airportsList);
      return;
    }

    const filteredList = airportsList.filter((airportData: AirportData) => {
      const iataFits = airportData.iata.includes(searchInput);
      const nameFits = airportData.name.includes(searchInput);

      if (iataFits || nameFits) return true;
      return false;
    });

    if (filteredList.length) {
      setFilteredAirportsList(filteredList);
      return;
    }

    onSearchRequestAsync(searchInput);
  };

  const onSearchRequestAsync = async (searchInput: string) => {
    setIsLoading(true);

    const airportsListByName = await airportsListByNameRequest({
      name: searchInput,
    });
    if (airportsListByName.length) {
      setFilteredAirportsList(airportsListByName);
      setIsLoading(false);
      return;
    }

    const airportsListByCode = await airportsListByCodeRequest({
      iata: searchInput,
    });
    if (airportsListByCode.length) {
      setFilteredAirportsList(airportsListByCode);
      setIsLoading(false);
      return;
    }

    setFilteredAirportsList([]);
  };

  const [debounceSearch] = useDebounce(onSearch, 500);
  const onChange = (newSearchText: string) => {
    if (searchText === newSearchText) {
      return;
    }

    setSearchText(newSearchText);
    debounceSearch(newSearchText);
  };

  const searchPlaceholder = 'Please enter airport name or code';
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        Please enter airport name or code:
      </header>
      <input
        name="searchInput"
        className={styles.searchInput}
        type={'text'}
        value={searchText}
        placeholder={searchPlaceholder}
        onChange={(e) => onChange(e.target.value)}
      />
      <AirportsList airportsList={filteredAirportsList} isLoading={isLoading} />
    </div>
  );
}

export default App;
