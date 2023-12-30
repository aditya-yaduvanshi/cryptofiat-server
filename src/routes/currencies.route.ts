import { Router } from 'express';
import { listCurrenciesHandler } from '../controllers/currencies.controller';

const router = Router();

router.get('/', listCurrenciesHandler);

export default router;
