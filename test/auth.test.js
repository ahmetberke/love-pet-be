import request from 'supertest';
import getServer from '../src/server';
import sequelize from '../src/db/db-con';
import populateDb from './populate-db';
import mailService from '../src/services/mail-service';

jest.mock('../src/services/mail-service');

const baseUrl = '/api/auth';

describe('Auth CRUD', () => {
  let server = null;
  let app = null;

  beforeAll(async () => {
    server = await getServer();
    await populateDb();

    app = request(server);
  });

  it('should signup and return token', async () => {
    const reqBody = {username: 'aykutovic2', password: 'Tatar123',
      mail: 'aykut__1995@hotmail.com', phone: '5393556000', address: 'Besiktas',
      provinceId: 1, userTypeId: 2, rating: 0};
    const res = await app.
        post(`${baseUrl}/signup`).
        send(reqBody);

    expect(res.body).toHaveProperty('token');
    expect(res.body.token).not.toBeNull();
    expect(res.statusCode).toEqual(200);
  });

  it('should login and return token', async () => {
    const reqBody = {usernameOrMail: 'aykutovic2', password: 'Tatar123'};
    const res = await app.
        post(`${baseUrl}/login`).
        send(reqBody);

    expect(res.body).toHaveProperty('token');
    expect(res.body.token).not.toBeNull();
    expect(res.statusCode).toEqual(200);
  });

  it('should return password renewal link', async () => {
    mailService.sendMail.mockResolvedValue();

    const reqBody = {usernameOrMail: 'aykutovic2'};
    const res = await app.
        post(`${baseUrl}/forgetPassword`).
        send(reqBody);

    expect(res.statusCode).toEqual(200);

    const expectedResBody = {msg: 'Check your email!'};
    expect(res.body).toEqual(expect.objectContaining(expectedResBody));

    expect(mailService.sendMail).toHaveBeenCalled();
  });

  it('should renew password', async () => {
    const reqBody = {userid: 1, uuid: 'uuid1test'};
    const res = await app.
        post(`${baseUrl}/renewPassword`).
        send(reqBody);

    expect(res.statusCode).toEqual(200);

    const expectedResBody = {msg: 'Password changed!'};
    expect(res.body).toEqual(expect.objectContaining(expectedResBody));
  });

  afterAll(async () => {
    await server.close();
    await sequelize.close();
  });
});
