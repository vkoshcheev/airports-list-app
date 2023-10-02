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

  const responseData: AirportData[] = await axiosRequest({ requestConfig, dataDescription });
  return responseData;
}
