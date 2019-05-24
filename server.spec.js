/*
- when making a GET to the `/` endpoint
  the API should respond with status code 200
  and the following JSON object: `{ api: 'running' }`.
*/
const request = require('supertest');
const server = require('./server.js'); // this is our first red, file doesn't exist yet

describe('server.js', () => {

  describe('index route', () => {
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

});
