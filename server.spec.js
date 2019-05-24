
const request = require('supertest');
const server = require('./server.js');
const knexConfig = require('./knexfile.js');
const db = require('knex')(knexConfig.development);

describe('server.js', () => {

  beforeAll(async () => {
    await db('games').truncate();
  });

  afterEach(async () => {
    await db('games').truncate();
  });


  describe('GET / (index route)', () => {
    it('should return an OK status code from the index route', async () => {
      const expectedStatusCode = 200;
      const response = await request(server).get('/');

      expect(response.status).toEqual(expectedStatusCode);
    });

    it('should return a JSON object fron the index route', async () => {
      const expectedBody = { api: 'running' };
      const response = await request(server).get('/');

      expect(response.body).toEqual(expectedBody);
    });

    it('should return a JSON object fron the index route', async () => {
      const response = await request(server).get('/');

      expect(response.type).toEqual('application/json');
    });
  });

  describe('POST /games', () => {
    it('Should throw a err(422) if handed a bad schema', async () => {
      const badSchema = {title: "Some Indie Game"};

      const response = await request(server).post('/games').send(badSchema);

      expect(response.status).toEqual(422);
    })

    it('Should return ok(200) if passed a good schema', async () => {
      const goodSchema = { title: "Web Dev Simulator", genre: "Simulation", releaseYear: "2018" };

      const response = await request(server).post('/games').send(goodSchema);

      expect(response.status).toEqual(200);
    })

    it('Should allow releaseYear to be optional', async () => {
      const optionalSchema = { title: "This Game Sucks", genre: "Something" };

      const response = await request(server).post('/games').send(optionalSchema);

      expect(response.type).toEqual('application/json');
    })

    it('Should respond with an array', async () => {
      const testSchema = { title: "The Zombies", genre: "Shooter" };

      const response = await request(server).post('/games').send(testSchema);

      expect(response.type).toEqual('application/json');
    })
  });

  describe('GET /games', () => {
    it('Should return ok(200) on GET', async () => {
      const response = await request(server).get('/games');

      expect(response.status).toEqual(200);
    })

    it('Should respond with an array', async () => {
      const response = await request(server).get('/games');

      expect(response.type).toEqual('application/json');
    })

    it('Should return the list of games', async () => {
      const response = await request(server).get('/games');

      expect(response.body).toEqual(expect.any(Array));
    })
  });
});
