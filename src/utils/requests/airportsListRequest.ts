import { AxiosRequestConfig } from 'axios';
import { axiosRequest } from './requestUtils';
import { AirportData } from '../types';
import { endpoints } from './endpoints';

export async function airportsListRequest(country: string = 'US') {
  const dataDescription = 'airports list';

  const requestConfig: AxiosRequestConfig = {
    ...endpoints.getAirportsListByCountry(country),
  };

  const response = await axiosRequest({ requestConfig, dataDescription });
  const data = response?.data as AirportData[];
  console.log(`${dataDescription}:\r\n${JSON.stringify(data)}`);

  return data;
}
