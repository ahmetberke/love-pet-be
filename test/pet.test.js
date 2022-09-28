import request from 'supertest';
import getServer from '../src/server';
import sequelize from '../src/db/db-con';
import populateDb from './populate-db';

const baseUrl = '/api/pets';

describe('Pets CRUD', () => {
  let server = null;
  let app = null;
  let token = null;

  beforeAll(async () => {
    server = await getServer();
    token = await populateDb();

    app = request(server);
  });

  it('should post a pet', async () => {
    const reqBody = {
      id: 11, name: 'lady',
      birthDate: '2020-07-24',
      breedId: 2, userId: 1,
    };
    const res = await app.
        post(`${baseUrl}/`).
        send(reqBody).
        set({'authorization': token});

    expect(res.statusCode).toEqual(200);
  });

  it('should get all pet', async () => {
    const res = await app.
        get(`${baseUrl}/`).
        set({'authorization': token});

    expect(res.statusCode).toEqual(200);

    const expected = [{
      id: 11, name: 'lady',
      birthDate: '2020-07-24',
      breedId: 2, userId: 1,
    }];
    expect(res.body).toEqual(expect.arrayContaining(expected));
  });

  it('should get selected pet', async () => {
    const res = await app.
        get(`${baseUrl}/11`).
        set({'authorization': token});

    expect(res.statusCode).toEqual(200);

    const expectedResBody = {
      id: 11, name: 'lady',
      birthDate: '2020-07-24',
      breedId: 2, userId: 1,
    };
    expect(res.body).toEqual(expect.objectContaining(expectedResBody));
  });

  it('should update a pet', async () => {
    const reqBody = {birthDate: '2020-07-27'};
    const res = await app.
        put(`${baseUrl}/11`).
        send(reqBody).
        set({'authorization': token});

    expect(res.statusCode).toEqual(200);
  });

  it('should get selected pet after update', async () => {
    const res = await app.
        get(`${baseUrl}/11`).
        set({'authorization': token});

    expect(res.statusCode).toEqual(200);

    const expectedResBody = {
      id: 11, name: 'lady',
      birthDate: '2020-07-27',
      breedId: 2, userId: 1,
    };

    expect(res.body).toEqual(expect.objectContaining(expectedResBody));
  });

  it('should delete a pet', async () => {
    const res = await app.
        delete(`${baseUrl}/11`).
        send().
        set({'authorization': token});

    expect(res.statusCode).toEqual(200);
  });

  it('should get not found after delete', async () => {
    const res = await app.
        get(`${baseUrl}/11`).
        set({'authorization': token});

    expect(res.statusCode).toEqual(404);
  });

  afterAll(async () => {
    await server.close();
    await sequelize.close();
  });
});
