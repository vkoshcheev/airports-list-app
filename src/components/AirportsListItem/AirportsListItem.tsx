import React from 'react';
import { AirportData } from '../../utils/types';
import styles from './AirportsListItem.styles.module.css';

const AirportListItem = ({ airportData }: { airportData: AirportData }) => {
  const { name, iata, latitude, longitude } = airportData;
  const description = `${name} (${iata})`;
  const coordinates = `${latitude}, ${longitude}`;

  return (
    <div className={styles.itemContainer}>
      <div className={styles.description}>{description}</div>
      <div className={styles.coordinates}>{coordinates}</div>
    </div>
  );
};

export default AirportListItem;
