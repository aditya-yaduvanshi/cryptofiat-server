import supertest from 'supertest'
import app from '../src/app'

describe('Currencies API', () => {
  it('should get a list of currencies', async () => {
    const response = await supertest(app).get('/api/v1/currencies')
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('data')
    expect(response.body.data).toHaveProperty('cryptoCurrencies')
    expect(response.body.data).toHaveProperty('fiatCurrencies')
  })

  it('should convert cryptocurrency to fiat', async () => {
    const response = await supertest(app).get('/api/v1/currencies/crypto-to-fiat?source=BTC&amount=1&target=USD')
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('data')
  })
})
