const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('handofRes routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should create cars', async () => {
    const cars = { model: 'tacoma', make: 'toyota', year: 2016};
    const res = await request(app).post(`/api/v1/cars`).send(cars);

    expect(res.body).toEqual({
      id: expect.any(String),
      ...cars,
    });
  });
});
