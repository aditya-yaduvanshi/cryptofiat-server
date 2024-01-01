export type CryptoCurrency = {
  id: number;
  name: string;
  symbol: string;
  sign: string;
};

export type CryptoInfo = {
  id: number;
  name: string;
  logo: string;
};

export type CryptoQuote = {
  id: number;
  name: string;
  symbol: string;
  quote: Record<string, Record<string, number>>;
};

export type FiatCurrency = {
  id: number;
  name: string;
  sign: string;
  symbol: string;
};
