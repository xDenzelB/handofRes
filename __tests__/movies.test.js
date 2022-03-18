const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Movies = require('../lib/models/Movies');

describe('handofRes routes', () => {
    beforeEach(() => {
      return setup(pool);
    });
  
    afterAll(() => {
      pool.end();
    });

it('should create a movie', async () => {
    const movies = { title: 'jaws', director: 'Steven SpielBurg', year: 1975};
    const res = await request(app).post(`/api/v1/movies`).send(movies)

    expect(res.body).toEqual({
        id: expect.any(String),
        ...movies,
    });
});

it('should get a list of movies by ID', async () => {
    const movies = await Movies.insert({ title: 'AntMan', director: 'Kevin', year: 2015});
    const res = await request(app).get(`/api/v1/movies/${movies.id}`);

    expect(res.body).toEqual(movies);
});

it('should get all of the movies', async () => {
    const movies = await Movies.getAll();
    const res = await request(app).get(`/api/v1/movies`);

    expect(res.body).toEqual(movies);
});

it('should update a movie', async () => {
    const movies = await Movies.insert({ title: 'StarWars', director: 'George Lucas', year: 1977});
    const res = await request(app)
    .patch(`/api/v1/movies/${movies.id}`)
    .send({ title: 'StarWars 2', director: 'George Lucas', year: 1980});

    const expected = {
        id: expect.any(String),
        title: 'StarWars 2',
        director: 'George Lucas',
        year: 1980,
    };

    expect(res.body).toEqual(expected);
    expect(await Movies.getById(movies.id)).toEqual(expected);
});

it('should delete a movie', async () => {
    const movies = await Movies.insert({ title: 'The Dark Knight', director: 'Christopher Nolan', year: 2008});
    const res = await request(app).delete(`/api/v1/movies/${movies.id}`);

    expect(res.body).toEqual(movies);
    expect(await Movies.getById(movies.id)).toBeNull();
});
});