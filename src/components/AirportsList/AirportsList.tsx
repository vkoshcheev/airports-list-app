import React, { useCallback } from 'react';
import styles from './AirportsList.styles.module.css';
import AirportListHeader from '../AirportsListHeader/AirportsListHeader';
import { AirportData } from '../../utils/types';
import AirportListItem from '../AirportsListItem/AirportsListItem';

const AirportsList = ({
  airportsList,
  isLoading,
}: {
  airportsList: AirportData[];
  isLoading: boolean;
}) => {
  const renderItem = useCallback(
    ({ item, index }: { item: AirportData; index: number }) => (
      <AirportListItem key={index} airportData={item} />
    ),
    []
  );

  const noDataMessage = 'No entries found';
  const loadingMessage = 'Loading...';

  return (
    <div className={styles.list}>
      <AirportListHeader />
      {!airportsList.length || isLoading ? (
        <div className={styles.listMessage}>
          {isLoading ? loadingMessage : noDataMessage}
        </div>
      ) : (
        airportsList.map((item, index) => renderItem({ item, index }))
      )}
    </div>
  );
};

export default AirportsList;
