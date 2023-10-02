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

  const responseData: AirportData[] = await axiosRequest({ requestConfig, dataDescription });
  return responseData;
}
