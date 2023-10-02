import axios, { AxiosRequestConfig, AxiosError } from 'axios';

export enum METHOD {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
  PUT = 'PUT',
}

axios.defaults.headers.common['X-RapidAPI-Key'] = '4b3d50217bmsh5fd912f66f1e90fp112a84jsnd0835779ceda';
axios.defaults.headers.common['X-RapidAPI-Host'] = 'airports-by-api-ninjas.p.rapidapi.com';

export const axiosRequest = async ({
  requestConfig,
  dataDescription = 'unspecified data',
}: {
  requestConfig: AxiosRequestConfig;
  dataDescription?: string;
}) => {
  const log: string[] = [];
  log.push(`Performing ${dataDescription} request...`);

  try {
    const response = await axios(requestConfig);
    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    const errorMessage = error.message || error;
    const errorText = `Error getting ${dataDescription}:\r\n${errorMessage}`;
    log.push(errorText);
    throw(errorText)
  } finally {
    printLog(log);
  }
};

export function printLog(log: string[]) {
  const logString = log.join('\n');
  console.log(logString);
}
