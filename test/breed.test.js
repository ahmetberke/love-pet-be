import request from 'supertest';
import getServer from '../src/server';
import sequelize from '../src/db/db-con';
import populateDb from './populate-db';

const baseUrl = '/api/breeds';

describe('Breeds CRUD', () => {
  let server = null;
  let app = null;

  beforeAll(async () => {
    server = await getServer();
    await populateDb();

    app = request(server);
  });

  it('should post a breed', async () => {
    const reqBody = {id: 11, name: 'tuna', breedTypeId: 3};
    const res = await app.
        post(`${baseUrl}/`).
        send(reqBody);

    expect(res.statusCode).toEqual(200);
  });

  it('should get all breed', async () => {
    const res = await app.
        get(`${baseUrl}/`);

    expect(res.statusCode).toEqual(200);

    const expected = [{id: 11, name: 'tuna', breedTypeId: 3}];
    expect(res.body).toEqual(expect.arrayContaining(expected));
  });

  it('should get selected breed', async () => {
    const res = await app.
        get(`${baseUrl}/11`);

    expect(res.statusCode).toEqual(200);

    const expectedResBody = {id: 11, name: 'tuna', breedTypeId: 3};
    expect(res.body).toEqual(expect.objectContaining(expectedResBody));
  });

  it('should update a breed', async () => {
    const reqBody = {id: 11, name: 'shark', breedTypeId: 3};
    const res = await app.
        put(`${baseUrl}/11`).
        send(reqBody);

    expect(res.statusCode).toEqual(200);
  });

  it('should get selected breed after update', async () => {
    const res = await app.
        get(`${baseUrl}/11`);

    expect(res.statusCode).toEqual(200);

    const expectedResBody = {id: 11, name: 'shark', breedTypeId: 3};
    expect(res.body).toEqual(expect.objectContaining(expectedResBody));
  });

  it('should delete a breed', async () => {
    const res = await app.
        delete(`${baseUrl}/11`).
        send();

    expect(res.statusCode).toEqual(200);
  });

  it('should get not found after delete', async () => {
    const res = await app.
        get(`${baseUrl}/11`);

    expect(res.statusCode).toEqual(404);
  });

  afterAll(async () => {
    await server.close();
    await sequelize.close();
  });
});
