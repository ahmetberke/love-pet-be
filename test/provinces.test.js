import request from 'supertest';
import getServer from '../src/server';
import sequelize from '../src/db/db-con';
import populateDb from './populate-db';

const baseUrl = '/api/provinces';

describe('Provinces CRUD', () => {
  let server = null;
  let app = null;

  beforeAll(async () => {
    server = await getServer();
    await populateDb();

    app = request(server);
  });

  it('should post a province', async () => {
    const reqBody = {id: 16, name: 'Avcilar', cityId: 1};
    const res = await app.
        post(`${baseUrl}/`).
        send(reqBody);

    expect(res.statusCode).toEqual(200);
  });

  it('should get all provinces', async () => {
    const res = await app.
        get(`${baseUrl}/`);

    expect(res.statusCode).toEqual(200);

    const expected = [{id: 16, name: 'Avcilar', cityId: 1}];
    expect(res.body).toEqual(expect.arrayContaining(expected));
  });

  it('should get selected province', async () => {
    const res = await app.
        get(`${baseUrl}/16`);

    expect(res.statusCode).toEqual(200);

    const expectedResBody = {id: 16, name: 'Avcilar', cityId: 1};
    expect(res.body).toEqual(expect.objectContaining(expectedResBody));
  });

  it('should update a province', async () => {
    const reqBody = {name: 'Beylikduzu'};
    const res = await app.
        put(`${baseUrl}/16`).
        send(reqBody);

    expect(res.statusCode).toEqual(200);
  });

  it('should get selected province after update', async () => {
    const res = await app.
        get(`${baseUrl}/16`);

    expect(res.statusCode).toEqual(200);

    const expectedResBody = {id: 16, name: 'Beylikduzu', cityId: 1};
    expect(res.body).toEqual(expect.objectContaining(expectedResBody));
  });

  it('should delete a province', async () => {
    const res = await app.
        delete(`${baseUrl}/16`).
        send();

    expect(res.statusCode).toEqual(200);
  });

  it('should get not found after delete', async () => {
    const res = await app.
        get(`${baseUrl}/16`);

    expect(res.statusCode).toEqual(404);
  });

  afterAll(async () => {
    await server.close();
    await sequelize.close();
  });
});
