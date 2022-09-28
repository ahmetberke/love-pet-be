import request from 'supertest';
import getServer from '../src/server';
import sequelize from '../src/db/db-con';
import populateDb from './populate-db';

const baseUrl = '/api/cities';

describe('Cities CRUD', () => {
  let server = null;
  let app = null;

  beforeAll(async () => {
    server = await getServer();
    await populateDb();

    app = request(server);
  });

  it('should post a city', async () => {
    const reqBody = {id: 11, name: 'Hakkari', countryId: 1};
    const res = await app.
        post(`${baseUrl}/`).
        send(reqBody);

    expect(res.statusCode).toEqual(200);
  });

  it('should get all cities', async () => {
    const res = await app.
        get(`${baseUrl}/`);

    expect(res.statusCode).toEqual(200);

    const expected = [{id: 11, name: 'Hakkari', countryId: 1}];
    expect(res.body).toEqual(expect.arrayContaining(expected));
  });

  it('should get selected city', async () => {
    const res = await app.
        get(`${baseUrl}/11`);

    expect(res.statusCode).toEqual(200);

    const expectedResBody = {id: 11, name: 'Hakkari', countryId: 1};
    expect(res.body).toEqual(expect.objectContaining(expectedResBody));
  });

  it('should update a city', async () => {
    const reqBody = {name: 'Trabzon'};
    const res = await app.
        put(`${baseUrl}/11`).
        send(reqBody);

    expect(res.statusCode).toEqual(200);
  });

  it('should get selected city after update', async () => {
    const res = await app.
        get(`${baseUrl}/11`);

    expect(res.statusCode).toEqual(200);

    const expectedResBody = {id: 11, name: 'Trabzon', countryId: 1};
    expect(res.body).toEqual(expect.objectContaining(expectedResBody));
  });

  it('should delete a city', async () => {
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
