const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Pizza = require('../lib/models/Pizza');

describe('handofRes routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

it('should create pizza', async () => {
    const pizza = { crust: 'hand tossed', cheese: 'mozzarella', topping: 'pepperoni'};
    const res = await request(app).post(`/api/v1/pizza`).send(pizza);

    expect(res.body).toEqual({
        id: expect.any(String),
        ...pizza,
    });
});

it('should be able to list pizza by ID', async () => {
    const pizza = await Pizza.insert({ crust: 'pie', cheese: 'ricotta', topping: 'mushrooms'});
    const res = await request(app).get(`/api/v1/pizza/${pizza.id}`);

    expect(res.body).toEqual(pizza);
});

it('should get all the pizzas', async () => {
    const pizza = await Pizza.getAll();
    const res = await request(app).get(`/api/v1/pizza`);

    expect(res.body).toEqual(pizza);
});

it('should update a pizza', async () => {
    const pizza = await Pizza.insert({ crust: 'hand tossed', cheese: 'mozzarella', topping: 'bacon' });
    const res = await request(app)
    .patch(`/api/v1/pizza/${pizza.id}`)
    .send({ crust: 'hand tossed', cheese: 'mozzarella', topping: 'pineapple'});

    const expected = {
        id: expect.any(String),
        crust: 'hand tossed',
        cheese: 'mozzarella',
        topping: 'pineapple',
    };
    expect(res.body).toEqual(expected);
    expect(await Pizza.getById(pizza.id)).toEqual(expected);
});

it('should delete a pizza :(', async () => {
    const pizza = await Pizza.insert({ crust: 'pie', cheese: 'ricotta', topping: 'olives'});
    const res = await request(app).delete(`/api/v1/pizza/${pizza.id}`);

    expect(res.body).toEqual(pizza);
    expect(await Pizza.getById(pizza.id)).toBeNull 
});

});