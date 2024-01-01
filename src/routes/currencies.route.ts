import { Router } from 'express';
import { cryptoToFiatConversionHander, listCurrenciesHandler } from '../controllers/currencies.controller';

const router = Router();

router.get('/', listCurrenciesHandler);
router.get('/crypto-to-fiat', cryptoToFiatConversionHander);

export default router;
