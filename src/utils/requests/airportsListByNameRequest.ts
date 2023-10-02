import { AxiosRequestConfig } from 'axios';
import { axiosRequest } from './requestUtils';
import { AirportData } from '../types';
import { endpoints } from './endpoints';

export async function airportsListByNameRequest({
  name,
  country = 'US',
}: {
  name: string;
  country?: string;
}) {
  const dataDescription = 'airports list by name';

  const requestConfig: AxiosRequestConfig = {
    ...endpoints.getAirportsListByName(name, country),
  };

  const response = await axiosRequest({ requestConfig, dataDescription });
  const data = response?.data as AirportData[];
  console.log(`${dataDescription}:\r\n${JSON.stringify(data)}`);

  return data;
}
