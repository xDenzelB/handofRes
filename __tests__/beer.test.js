const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Beer = require('../lib/models/Beer');

describe('handofRes routes', () => {
    beforeEach(() => {
      return setup(pool);
    });
  
    afterAll(() => {
      pool.end();
    });

it('should create beer', async () => {
    const beer = { type: 'IPA', hop: 8, flavor: 'bitter'};
    const res = await request(app).post(`/api/v1/beer`).send(beer);

    expect(res.body).toEqual({
        id: expect.any(String),
        ...beer,
    });
});

it('should get beer by ID', async () => {
    const beer = await Beer.insert({ type: 'lager', hop: 3, flavor: 'light'});
    const res = await request(app).get(`/api/v1/beer/${beer.id}`);

    expect(res.body).toEqual(beer);
});

it('should get all beer', async () => {
    const beer = await Beer.getAll();
    const res = await request(app).get(`/api/v1/beer`);

    expect(res.body).toEqual(beer);
});

it('should update beer', async () => {
    const beer = await Beer.insert({ type: 'Stout', hop: 5, flavor: 'rich'});
    const res = await request(app)
    .patch(`/api/v1/beer/${beer.id}`)
    .send({ type: 'Stout', hop: 5, flavor: 'bitter'});

    const expected = {
        id: expect.any(String),
        type: 'Stout',
        hop: 5,
        flavor: 'bitter',

    };
    expect(res.body).toEqual(expected);
    expect(await Beer.getById(beer.id)).toEqual(expected);
})
});