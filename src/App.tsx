import { useEffect, useState } from 'react';
import styles from './App.styles.module.css';
import AirportsList from './components/AirportsList/AirportsList';
import { airportsListByCodeRequest } from './utils/requests/airportsListByCodeRequest';
import { airportsListByNameRequest } from './utils/requests/airportsListByNameRequest';
import { airportsListRequest } from './utils/requests/airportsListRequest';
import { AirportData } from './utils/types';
import useDebounce from './utils/useDebounce';

// notes:
// server returns 400 error if user attempts to search airport by name/code and there are no matches;
// it is uncertain whether it's intended behavior;
// usually the server is supposed to return empty list in such cases, not error.

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [airportsList, setAirportsList] = useState<AirportData[]>([]);
  const [filteredAirportsList, setFilteredAirportsList] = useState<
    AirportData[]
  >([]);
  const [searchText, setSearchText] = useState('');
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    getInitialAirportsList();
  }, []);

  const getInitialAirportsList = async () => {
    setIsLoading(true);
    try {
      const initialList = await airportsListRequest();
      setAirportsList(initialList);
      setFilteredAirportsList(initialList);
    } catch (e: any) {
      const errorMessage = e.message || e;
      setErrorText(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const onSearch = (searchInput: string, airportsList: AirportData[]) => {
    if (!searchInput) {
      setFilteredAirportsList(airportsList);
      return;
    }

    const input = searchInput.toLowerCase();
    const filteredList = airportsList.filter(({ iata, name }: AirportData) => {
      const iataFits = iata.toLowerCase().includes(input);
      const nameFits = name.toLowerCase().includes(input);

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

    try {
      const airportsListByName = await airportsListByNameRequest({
        name: searchInput,
      });
      if (airportsListByName.length) {
        setFilteredAirportsList(airportsListByName);
        return;
      }

      const airportsListByCode = await airportsListByCodeRequest({
        iata: searchInput,
      });
      if (airportsListByCode.length) {
        setFilteredAirportsList(airportsListByCode);
        return;
      }
    } catch (e: any) {
      const errorMessage = e.message || e;
      setErrorText(errorMessage);
    } finally {
      setIsLoading(false);
    }
    setFilteredAirportsList([]);
  };

  const [debounceSearch] = useDebounce(onSearch, 500);
  const onChange = (newSearchText: string) => {
    if (errorText) setErrorText('');
    if (searchText === newSearchText) return;

    if (!newSearchText) {
      setFilteredAirportsList(airportsList);
      return;
    }

    setSearchText(newSearchText);
    debounceSearch(newSearchText, airportsList);
  };

  const searchPlaceholder = 'Please enter airport name or code';
  return (
    <div className={styles.page}>
      <input
        name="searchInput"
        className={styles.searchInput}
        type={'text'}
        value={searchText}
        placeholder={searchPlaceholder}
        onChange={(e) => onChange(e.target.value)}
      />
      <AirportsList airportsList={filteredAirportsList} isLoading={isLoading} errorText={errorText} />
    </div>
  );
}

export default App;
