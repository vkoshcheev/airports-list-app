import { AxiosRequestConfig } from 'axios';
import { axiosRequest } from './requestUtils';
import { AirportData } from '../types';
import { endpoints } from './endpoints';

export async function airportsListRequest(country: string = 'US') {
  const dataDescription = 'airports list';

  const requestConfig: AxiosRequestConfig = {
    ...endpoints.getAirportsListByCountry(country),
  };

  const responseData: AirportData[] = await axiosRequest({ requestConfig, dataDescription });
  return responseData;
}
