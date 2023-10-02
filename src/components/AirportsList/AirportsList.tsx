import React, { useCallback } from 'react';
import styles from './AirportsList.styles.module.css';
import AirportListHeader from '../AirportsListHeader/AirportsListHeader';
import { AirportData } from '../../utils/types';
import AirportListItem from '../AirportsListItem/AirportsListItem';

const AirportsList = ({
  airportsList,
  isLoading,
  errorText,
}: {
  airportsList: AirportData[];
  isLoading: boolean;
  errorText: string;
}) => {
  const renderItem = useCallback(
    ({ item, index }: { item: AirportData; index: number }) => (
      <AirportListItem key={index} airportData={item} />
    ),
    []
  );

  const noDataMessage = 'No entries found';
  const loadingMessage = 'Loading...';

  const showListMessage = isLoading || !!errorText || !airportsList.length;
  const listMessage = isLoading ? loadingMessage : errorText || noDataMessage;

  return (
    <div className={styles.list}>
      <AirportListHeader />
      {showListMessage ? (
        <div className={styles.listMessage}>{listMessage}</div>
      ) : (
        airportsList.map((item, index) => renderItem({ item, index }))
      )}
    </div>
  );
};

export default AirportsList;
