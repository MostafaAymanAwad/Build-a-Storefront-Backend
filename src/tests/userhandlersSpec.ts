// @ts-ignore
import client from '../database';
import { user, userentity } from '../models/user';
import supertest from 'supertest';

import app from '../server';

const request = supertest(app);
const user_entity = new userentity();

describe('testing user handlers methods', () => {
  let token = '';
  const test_user: user = {
    id: 9,
    user_name: 'testapi',
    first_name: 'test',
    second_name: '2',
    password: 'secret',
  };
  beforeAll(async () => {
    await user_entity.create(test_user);
  });
  afterAll(async () => {
    // @ts-ignore
    const connection = await client.connect();
    const sql =
      'DELETE FROM users; \n ALTER SEQUENCE users_id_seq RESTART WITH 1;';
    await connection.query(sql);
    connection.release();
  });
  it('testing authenticate to authenticate user', async () => {
    const res = await request
      .post('/authenticate')
      .set('Content-type', 'application/json')
      .send({
        username: 'testapi',
        password: 'secret',
      });
    token = res.body.token;
    expect(res.body.user_name).toBe('testapi');
    expect(res.body.second_name).toBe('2');
  });
  it('testing create to create user', async () => {
    const res = await request
      .post('/users')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        username: 'testapi2',
        firstname: 'testing',
        secondname: '2',
        password: 'secret2',
      });
    expect(res.body.user_name).toBe('testapi2');
    expect(res.body.second_name).toBe('2');
  });
  it('testing show to get user by username', async () => {
    const res = await request
      .get('/users/testapi')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    expect(res.body.user_name).toBe('testapi');
    expect(res.body.second_name).toBe('2');
  });
  it('testing index to get all users', async () => {
    const res = await request
      .get('/users')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    expect(res.body.length).toBe(2);
  });
});
