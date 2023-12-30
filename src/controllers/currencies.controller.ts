import type { Request, Response } from 'express';
import type { CryptoCurrency, CryptoInfo } from '../types';
import { getCryptoInfos, listCryptoCurrencies, listFiatCurrencies } from '../services/currencies.service';

/**
 * @name listCurrenciesHandler - A handler function to handle list currencies api endpoint.
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns response either with data or with error.
 */
export const listCurrenciesHandler = async (_req: Request, res: Response) => {
  // a function to handle the list currencies api endpoint which fetches the currencies and returns the results
  try {
    // calling listCryptoCurrencies and listFiatCurrencies function
    const [cryptoCurrencyList, fiatCurrencies] = await Promise.all([listCryptoCurrencies(), listFiatCurrencies()]);

    // define an object to store information of each crypto currency by [id]: info format
    let cryptoInfos: Record<string, CryptoInfo> = {};

    // check if there is any data if then fetch information for all crypto currencies to get the logo url
    if (cryptoCurrencyList.length) {
      const cryptoIds = cryptoCurrencyList.map((currency) => currency.id);
      cryptoInfos = await getCryptoInfos(cryptoIds);
    }

    // mapping crypto currencies to include only useful fields
    const cryptoCurrencies = cryptoCurrencyList.map((currency: CryptoCurrency) => ({
      id: currency.id,
      name: currency.name,
      symbol: currency.symbol,
      logo: cryptoInfos[currency.id]?.logo,
    }));

    return res.json({
      data: { cryptoCurrencies, fiatCurrencies },
      status: 200,
      error: null,
    });
  } catch (err) {
    console.log('Error in listCurrenciesHandler: ', err);
    return res.json({
      status: 500,
      error: 'Something went wrong. Please try again later.',
    });
  }
};
