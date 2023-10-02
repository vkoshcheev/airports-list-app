import axios, { AxiosRequestConfig, AxiosError } from 'axios';

export enum METHOD {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
  PUT = 'PUT',
}

export const setAxiosInterceptor = () => {
  // Request interceptors for API calls
  axios.interceptors.request.use(
    (config) => {
      config.headers['X-RapidAPI-Key'] =
        '4b3d50217bmsh5fd912f66f1e90fp112a84jsnd0835779ceda';
      config.headers['X-RapidAPI-Host'] =
        'airports-by-api-ninjas.p.rapidapi.com';
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export const axiosRequest = async ({
  requestConfig,
  dataDescription = 'unspecified data',
}: {
  requestConfig: AxiosRequestConfig;
  dataDescription?: string;
}) => {
  const log: string[] = [];
  log.push(`Performing ${dataDescription} request...`);
  let response;

  try {
    response = await axios(requestConfig);
  } catch (e) {
    const error = e as AxiosError;
    const errorText = error.message || error;
    log.push(`Error getting ${dataDescription}: ${errorText}`);
    response = null;
  }

  if (!response) {
    const errorText = `Failed to receive response from server when requesting ${dataDescription}.`;
    log.push(errorText);
  }

  printLog(log);
  return response;
};

export function printLog(log: string[]) {
  const logString = log.join('\n');
  console.log(logString);
}
