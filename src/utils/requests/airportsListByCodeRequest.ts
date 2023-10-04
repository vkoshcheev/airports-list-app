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
}, axiosRequestConfig: AxiosRequestConfig) {
  const dataDescription = 'airports list by code';

  const requestConfig: AxiosRequestConfig = {
    ...endpoints.getAirportsListByCode(iata, country),
    ...axiosRequestConfig,
  };

  const responseData: AirportData[] = await axiosRequest({ requestConfig, dataDescription });
  return responseData;
}
