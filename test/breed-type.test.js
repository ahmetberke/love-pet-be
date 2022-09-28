import request from 'supertest';
import getServer from '../src/server';
import sequelize from '../src/db/db-con';
import populateDb from './populate-db';

const baseUrl = '/api/breedTypes';

describe('Breed Types CRUD', () => {
  let server = null;
  let app = null;

  beforeAll(async () => {
    server = await getServer();
    await populateDb();

    app = request(server);
  });

  it('should post a breed type', async () => {
    const reqBody = {id: 11, name: 'fish'};
    const res = await app.
        post(`${baseUrl}/`).
        send(reqBody);

    expect(res.statusCode).toEqual(200);
  });

  it('should get all breed types', async () => {
    const res = await app.
        get(`${baseUrl}/`);

    expect(res.statusCode).toEqual(200);

    const expected = [{id: 11, name: 'fish'}];
    expect(res.body).toEqual(expect.arrayContaining(expected));
  });

  it('should get selected breed type', async () => {
    const res = await app.
        get(`${baseUrl}/11`);

    expect(res.statusCode).toEqual(200);

    const expectedResBody = {id: 11, name: 'fish'};
    expect(res.body).toEqual(expect.objectContaining(expectedResBody));
  });

  it('should update a breed', async () => {
    const reqBody = {name: 'squirrel'};
    const res = await app.
        put(`${baseUrl}/11`).
        send(reqBody);

    expect(res.statusCode).toEqual(200);
  });

  it('should get selected breed type after update', async () => {
    const res = await app.
        get(`${baseUrl}/11`);

    expect(res.statusCode).toEqual(200);

    const expectedResBody = {id: 11, name: 'squirrel'};
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
