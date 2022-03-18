const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Music = require('../lib/models/Music');

describe('handofRes routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should create music list', async () => {
    const music = { song: 'jungle', artist: 'A Boogie', genre: 'hip/hop', year: 2016};
    const res = await request(app).post(`/api/v1/music`).send(music);

    expect(res.body).toEqual({
      id: expect.any(String),
      ...music,
    });
  });


//   it('should be able to list music by id', async () => {
//     const music = await Music.insert({ song: 'La Romana', artist: 'Bad Bunny', genre: 'reggaeton', year: 2019 });
//     const res = await request(app).get(`/api/v1/music/${music.id}`);

//     expect(res.body).toEqual(music);
//   });

//   it('should get a list of all music', async () => {
//     const music = await Music.getAll();
//     const res = await request(app).get(`/api/v1/music`);

//     expect(res.body).toEqual(music);
//   });

// it('should update music by id', async () => {
//   const music = await Music.insert({ song: 'Chosen', artist: 'Blxst', genre: 'hip/hop', year: 2020 });
//   const res = await request(app)
//   .patch(`/api/v1/music/${music.id}`)
//   .send({ song: 'Got it All', artist: 'Blxst', genre: 'hip/hop', year: 2019});

//   const expected = {
//     id: expect.any(String),
//     song: 'Got it All',
//     artist: 'Blxst',
//     genre: 'hip/hop',
//     year: 2019,
//   };
//   expect(res.body).toEqual(expected);
//   expect(await Music.getById(music.id)).toEqual(expected);
// });

// it('should be able to delete music by id', async () => {
//   const music = await Music.insert({ song: 'Low', artist: 'FloRida', genre: 'hip/hop', year: 2008});
//   const res = await request(app).delete(`/api/v1/music/${music.id}`);

//   expect(res.body).toEqual(music);
//   expect(await Music.getById(music.id)).toBeNull();
// });
});
