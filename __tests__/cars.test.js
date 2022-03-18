const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Cars = require('../lib/models/Cars');

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


  it('should be able to list cars by id', async () => {
    const cars = await Cars.insert({ model: 'civic', make: 'honda', year: 2008 });
    const res = await request(app).get(`/api/v1/cars/${cars.id}`);

    expect(res.body).toEqual(cars);
  });

  it('should get a list of all cars', async () => {
    const cars = await Cars.getAll();
    const res = await request(app).get(`/api/v1/cars`);

    expect(res.body).toEqual(cars);
  });

it('should update a car', async () => {
  const cars = await Cars.insert({ model: 'camry', make: 'toyota', year: 2015 });
  const res = await request(app)
  .patch(`/api/v1/cars/${cars.id}`)
  .send({ model: 'camry', make: 'toyota', year: 2018});

  const expected = {
    id: expect.any(String),
    model: 'camry',
    make: 'toyota',
    year: 2018,
  };
  expect(res.body).toEqual(expected);
  expect(await Cars.getById(cars.id)).toEqual(expected);
});

it('should be able to delete a car', async () => {
  const cars = await Cars.insert({ model: 'benz', make: 'mercedes', year: 2010});
  const res = await request(app).delete(`/api/v1/cars/${cars.id}`);

  expect(res.body).toEqual(cars);
  expect(await Cars.getById(cars.id)).toBeNull();
});
});
