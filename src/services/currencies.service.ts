import axios from 'axios';
import { config } from 'dotenv';
import type { CryptoCurrency, CryptoInfo, CryptoQuote, FiatCurrency } from '../types';

config();

const CMC_API_KEY = process.env.CMC_API_KEY ?? '';
const CMC_API_URL = process.env.CMC_API_URL ?? '';
const ER_API_KEY = process.env.ER_API_KEY ?? '';
const ER_API_URL = process.env.ER_API_URL ?? '';

// set the API key globally for all axios requests
axios.defaults.headers.common['X-CMC_PRO_API_KEY'] = CMC_API_KEY;
axios.defaults.baseURL = CMC_API_URL;

export const listCryptoCurrencies = async (): Promise<CryptoCurrency[]> => {
  try {
    const res = await axios.get('/v1/cryptocurrency/listings/latest', {
      params: {
        limit: 200,
      },
    });
    const { data } = res.data;
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
    const { data } = res.data;
    return data || {};
  } catch (err) {
    console.log('Error fetching crypto info: ', err);
    return {};
  }
};

export const listFiatCurrencies = async (): Promise<FiatCurrency[]> => {
  try {
    const res = await axios.get('v1/fiat/map');
    const { data } = res.data;
    return data || [];
  } catch (err) {
    console.log('Error listing fiat currencies: ', err);
    return [];
  }
};

export const getCryptoQuotes = async ({
  ids,
  symbols,
}: {
  ids?: number[];
  symbols?: string[];
}): Promise<Record<string, CryptoQuote>> => {
  try {
    if (!ids?.length && !symbols?.length) throw new Error('One of Ids or symbols is required!');
    const res = await axios.get('/v1/cryptocurrency/quotes/latest', {
      params: {
        id: ids?.join(','),
        symbol: symbols?.join(','),
      },
    });
    const { data } = res.data;
    return data || {};
  } catch (err) {
    console.log('Error fetching crypto info: ', err);
    return {};
  }
};

export const getFiatExchangeRates = async () => {
  try {
    const res = await axios.get(`${ER_API_URL}/v1/latest`, {
      params: {
        access_key: ER_API_KEY,
      },
    });
    const { rates, success } = res.data;
    return { data: rates, error: success ? null : 'Cannot fetch exchange rates!' };
  } catch (err) {
    console.log('Error getting fiat exchange rates: ', err);
    return { error: 'Something went wrong. Please try again later.' };
  }
};
