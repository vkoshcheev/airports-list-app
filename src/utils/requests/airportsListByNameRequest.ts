import { AxiosRequestConfig } from 'axios';
import { AirportData } from '../types';
import { endpoints } from './endpoints';
import { axiosRequest } from './requestUtils';

export async function airportsListByNameRequest({
  name,
  country = 'US',
}: {
  name: string;
  country?: string;
}, axiosRequestConfig: AxiosRequestConfig) {
  const dataDescription = 'airports list by name';

  const requestConfig: AxiosRequestConfig = {
    ...endpoints.getAirportsListByName(name, country),
    ...axiosRequestConfig,
  };

  const responseData: AirportData[] = await axiosRequest({ requestConfig, dataDescription });
  return responseData;
}
