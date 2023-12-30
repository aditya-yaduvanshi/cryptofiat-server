import axios from 'axios';
import { config } from 'dotenv';

config();

const API_KEY = process.env.CMC_API_KEY ?? '';
const API_URL = process.env.CMC_API_URL ?? '';

// set the API key globally for all axios requests
axios.defaults.headers.common['X-CMC_PRO_API_KEY'] = API_KEY;
axios.defaults.baseURL = API_URL;

export const listCryptoCurrencies = async () => {
  try {
    const res = await axios.get('/cryptocurrency/listings/latest', {
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
