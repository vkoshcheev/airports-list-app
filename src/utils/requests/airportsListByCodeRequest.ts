import { AxiosRequestConfig } from 'axios';
import { axiosRequest } from './requestUtils';
import { AirportData } from '../types';
import { endpoints } from './endpoints';

export async function airportsListByCodeRequest({
  iata,
  country = 'US',
}: {
  iata: string;
  country?: string;
}) {
  const dataDescription = 'airports list by code';

  const requestConfig: AxiosRequestConfig = {
    ...endpoints.getAirportsListByCode(iata, country),
  };

  const response = await axiosRequest({ requestConfig, dataDescription });
  const data = response?.data as AirportData[];
  console.log(`${dataDescription}:\r\n${JSON.stringify(data)}`);

  return data;
}
