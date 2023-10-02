import React from 'react';
import styles from './AirportsListHeader.styles.module.css';

const AirportListHeader = () => {
  return (
    <div className={styles.itemContainer}>
      <div className={styles.description}>{'Name (Code)'}</div>
      <div className={styles.coordinates}>{'Lat & Lng'}</div>
    </div>
  );
};

export default AirportListHeader;
