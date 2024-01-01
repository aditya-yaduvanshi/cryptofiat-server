import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import currencyRouter from './routes/currencies.route';

config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());

// index route and also to health check
app.get('/', (_req, res) => {
  res.send('Hello From CryptoFiat server!');
});

// api routers
app.use('/api/v1/currencies', currencyRouter);

app.listen(PORT, () => {
  console.log('Server is running on port: ', PORT);
});
