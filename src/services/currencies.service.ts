import axios from 'axios';
import { config } from 'dotenv';
import type { CryptoCurrency, CryptoInfo, FiatCurrency } from '../types';

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

export const getFiatConversionRate = async ({
  source = 'USD',
  amount,
  target,
}: {
  source: string;
  amount: number;
  target: string;
}) => {
  try {
    const res = await axios.get(`${ER_API_URL}/v1/convert`, {
      params: {
        access_key: ER_API_KEY,
        from: source,
        amount,
        target,
      },
    });
    const { result, success } = res.data;
    return { data: result, error: success ? null : 'Cannot convert at the moment!' };
  } catch (err) {
    console.log('Error getting fiat conversion rate: ', err);
    return { error: 'Something went wrong. Please try again later.' };
  }
};
