import { Router } from 'express';
import { cryptoToFiatConversionHander, listCurrenciesHandler } from '../controllers/currencies.controller';

const router = Router();

/**
 * @swagger
 * /currencies:
 *   get:
 *     tags: ["Currencies"]
 *     summary: Get a list of crypto and fiat currencies.
 *     description: Fetches the list of crypto and fiat currencies along with relevant information.
 *     responses:
 *       '200':
 *         description: Successful response with the list of currencies.
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               data:
 *                 cryptoCurrencies:
 *                   - id: "1"
 *                     name: "Bitcoin"
 *                     symbol: "BTC"
 *                     logo: "https://example.com/bitcoin-logo.png"
 *                 fiatCurrencies:
 *                   - id: "1"
 *                     name: "United States Dollar"
 *                     symbol: "USD"
 *                     sign: "$"
 *               error: null
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: 500
 *               error: "Something went wrong. Please try again later."
 */
router.get('/', listCurrenciesHandler);

/**
 * @swagger
 * /currencies/crypto-to-fiat:
 *   get:
 *     tags: ["Currencies"]
 *     summary: Convert cryptocurrency to fiat.
 *     description: Converts a specified amount of cryptocurrency to a specified fiat currency.
 *     parameters:
 *       - name: source
 *         in: query
 *         description: The source cryptocurrency symbol (e.g., BTC).
 *         required: true
 *         schema:
 *           type: string
 *       - name: amount
 *         in: query
 *         description: The amount of cryptocurrency to convert.
 *         required: true
 *         schema:
 *           type: number
 *       - name: target
 *         in: query
 *         description: The target fiat currency symbol (e.g., USD).
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response with the converted amount.
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               data: 9383.92
 *               error: null
 *       '400':
 *         description: Bad request, invalid input parameters.
 *         content:
 *           application/json:
 *             example:
 *               status: 400
 *               error: "Source is required!"
 *       '502':
 *         description: Unable to perform the conversion at the moment.
 *         content:
 *           application/json:
 *             example:
 *               status: 502
 *               error: "Cannot convert at the moment!"
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: 500
 *               error: "Something went wrong. Please try again later."
 */
router.get('/crypto-to-fiat', cryptoToFiatConversionHander);

export default router;
