/**
 * @name convertFromUSDCryptoToFiat
 * @param param.eurInUsd - EUR based USD rate.
 * @param param.cryptoInUsd - USD based crypto rate.
 * @param param.amountInFiat - USD based crypto rate.
 * @returns number - crypto amount in fiat.
 */
export const convertFromUSDCryptoToFiat = ({
  eurInUsd,
  cryptoInUsd,
  eurInFiat,
}: {
  eurInUsd: number;
  cryptoInUsd: number;
  eurInFiat: number;
}) => {
  // Function to convert from USD based cyrpto to Fiat with a base currency of Euro

  // Invert the rate for EUR to USD
  const exchangeRateUSDtoEUR = 1 / eurInUsd;

  // Convert USD to Euro
  const amountInEuro = cryptoInUsd * exchangeRateUSDtoEUR;

  // Convert Euro to other Fiat
  const amountInFiat = amountInEuro * eurInFiat;

  return amountInFiat;
};
