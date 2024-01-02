import { config } from 'dotenv';
config();

const HOST = process.env.HOST ?? '';

const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'CryptoFiat API',
      version: '1.0.0',
      description: 'Documentation for CryptoFiat API.',
    },
    servers: [
      {
        url: `${HOST}/api/v1`,
      },
    ],
  },
  apis: ['src/routes/*.ts'],
};

export default options;
