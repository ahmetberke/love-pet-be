import request from 'supertest';
import getServer from '../src/server';
import sequelize from '../src/db/db-con';
import populateDb from './populate-db';

const baseUrl = '/api/countries';

describe('Countries CRUD', () => {
  let server = null;
  let app = null;

  beforeAll(async () => {
    server = await getServer();
    await populateDb();

    app = request(server);
  });

  it('should post a country', async () => {
    const reqBody = {id: 11, name: 'Croatia'};
    const res = await app.
        post(`${baseUrl}/`).
        send(reqBody);

    expect(res.statusCode).toEqual(200);
  });

  it('should get all countries', async () => {
    const res = await app.
        get(`${baseUrl}/`);

    expect(res.statusCode).toEqual(200);

    const expected = [{id: 11, name: 'Croatia'}];
    expect(res.body).toEqual(expect.arrayContaining(expected));
  });

  it('should get selected country', async () => {
    const res = await app.
        get(`${baseUrl}/11`);

    expect(res.statusCode).toEqual(200);

    const expectedResBody = {id: 11, name: 'Croatia'};
    expect(res.body).toEqual(expect.objectContaining(expectedResBody));
  });

  it('should update a country', async () => {
    const reqBody = {name: 'Serbia'};
    const res = await app.
        put(`${baseUrl}/11`).
        send(reqBody);

    expect(res.statusCode).toEqual(200);
  });

  it('should get selected country after update', async () => {
    const res = await app.
        get(`${baseUrl}/11`);

    expect(res.statusCode).toEqual(200);

    const expectedResBody = {id: 11, name: 'Serbia'};
    expect(res.body).toEqual(expect.objectContaining(expectedResBody));
  });

  it('should delete a country', async () => {
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
