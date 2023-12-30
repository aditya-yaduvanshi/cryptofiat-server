import axios from 'axios';
import { config } from 'dotenv';
import { CryptoCurrency, CryptoInfo, FiatCurrency } from '../types';

config();

const API_KEY = process.env.CMC_API_KEY ?? '';
const API_URL = process.env.CMC_API_URL ?? '';

// set the API key globally for all axios requests
axios.defaults.headers.common['X-CMC_PRO_API_KEY'] = API_KEY;
axios.defaults.baseURL = API_URL;

export const listCryptoCurrencies = async (): Promise<CryptoCurrency[]> => {
  try {
    const res = await axios.get('/v1/cryptocurrency/listings/latest', {
      params: {
        limit: 200,
      },
    });
    const { data, status } = res.data;
    console.log(status.error_message);
    return data || [];
  } catch (err) {
    console.log('Error listing crypto currencies: ', err);
    return [];
  }
};

export const getCryptoInfos = async (ids: number[]): Promise<Record<string, CryptoInfo>> => {
  try {
    const res = await axios.get('/v2/cryptocurrency/info', {
      params: {
        id: ids.join(','),
      },
    });
    const { data, status } = res.data;
    console.log(status.error_message);
    return data || {};
  } catch (err) {
    console.log('Error fetching crypto info: ', err);
    return {};
  }
};

export const listFiatCurrencies = async (): Promise<FiatCurrency[]> => {
  try {
    const res = await axios.get('v1/fiat/map');
    const { data, status } = res.data;
    console.log(status.error_message);
    return data || [];
  } catch (err) {
    console.log('Error listing fiat currencies: ', err);
    return [];
  }
};
