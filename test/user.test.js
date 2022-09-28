import request from 'supertest';
import getServer from '../src/server';
import sequelize from '../src/db/db-con';
import populateDb from './populate-db';
import hash from '../src/middleware/sha256-hasher';

const baseUrl = '/api/users';

describe('Users CRUD', () => {
  let server = null;
  let app = null;
  let token = null;

  beforeAll(async () => {
    server = await getServer();
    token = await populateDb();

    app = request(server);
  });

  it('should post a user', async () => {
    const reqBody = {id: 11, username: 'tardelli', password: 'Tatar123',
      mail: 'aykut.bozkurt1995@gmail.com', phone: '5393556000',
      address: 'Besiktas', provinceId: 1, userTypeId: 2, rating: 0};
    const res = await app.
        post(`${baseUrl}/`).
        send(reqBody).
        set({'authorization': token});

    expect(res.statusCode).toEqual(200);
  });

  it('should get all user', async () => {
    const res = await app.
        get(`${baseUrl}/`).
        set({'authorization': token});

    expect(res.statusCode).toEqual(200);

    const mail = 'aykut.bozkurt1995@gmail.com';
    const expected = [{id: 11, username: 'tardelli',
      password: hash(mail + 'Tatar123'),
      mail: mail, phone: '5393556000', address: 'Besiktas',
      provinceId: 1, userTypeId: 2, rating: 0}];
    expect(res.body).toEqual(expect.arrayContaining(expected));
  });

  it('should get selected user', async () => {
    const res = await app.
        get(`${baseUrl}/11`).
        set({'authorization': token});

    expect(res.statusCode).toEqual(200);

    const mail = 'aykut.bozkurt1995@gmail.com';
    const expectedResBody = {id: 11, username: 'tardelli',
      password: hash(mail + 'Tatar123'),
      mail: 'aykut.bozkurt1995@gmail.com', phone: '5393556000',
      address: 'Besiktas', provinceId: 1, userTypeId: 2, rating: 0};
    expect(res.body).toEqual(expect.objectContaining(expectedResBody));
  });

  it('should update a user', async () => {
    const reqBody = {username: 'tardelli2'};
    const res = await app.
        put(`${baseUrl}/11`).
        send(reqBody).
        set({'authorization': token});

    expect(res.statusCode).toEqual(200);
  });

  it('should get selected user after update', async () => {
    const res = await app.
        get(`${baseUrl}/11`).
        set({'authorization': token});

    expect(res.statusCode).toEqual(200);

    const mail = 'aykut.bozkurt1995@gmail.com';
    const expectedResBody = {id: 11, username: 'tardelli2',
      password: hash(mail + 'Tatar123'), mail: 'aykut.bozkurt1995@gmail.com',
      phone: '5393556000', address: 'Besiktas',
      provinceId: 1, userTypeId: 2, rating: 0};
    expect(res.body).toEqual(expect.objectContaining(expectedResBody));
  });

  it('should delete a user', async () => {
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
