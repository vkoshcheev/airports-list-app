import { METHOD } from './requestUtils';

const server = 'https://airports-by-api-ninjas.p.rapidapi.com/v1';

export const endpoints = {
  // it's unclear whether we need to be able to get airports list by country code
  getAirportsListByCountry: (countryCode: string) => ({
    url: `${server}/airports?country=${countryCode}`,
    method: METHOD.GET,
  }),

  // name e.g. = John%20F%20Kennedy
  getAirportsListByName: (name: string, countryCode: string) => ({
    url: `${server}/airports?name=${name}&country=${countryCode}`,
    method: METHOD.GET,
  }),

  // iata e.g. = JFK
  // IATA = International Air Transport Association
  getAirportsListByCode: (iata: string, countryCode: string) => ({
    url: `${server}/airports?iata=${iata}&country=${countryCode}`,
    method: METHOD.GET,
  }),
};
