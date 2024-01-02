import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerOptions from './swagger';
import currencyRouter from './routes/currencies.route';

config();

const app = express();
app.use(cors());

// index route and also to health check
app.get('/', (_req, res) => {
  res.send('Hello From CryptoFiat server!');
});

// swagger api docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(swaggerOptions)));

// api routers
app.use('/api/v1/currencies', currencyRouter);

export default app;
