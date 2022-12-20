// @ts-ignore
import client from '../database';
import { user, userentity } from '../models/user';
import supertest from 'supertest';
import app from '../server';
import { orderentity } from '../models/order';

const request = supertest(app);
const user_entity = new userentity();
const order_entity = new orderentity();

describe('testing order handlers methods', () => {
  let token = '';
  const test_user: user = {
    user_name: 'testapi',
    first_name: 'test',
    second_name: '2',
    password: 'secret',
  };
  // @ts-ignore
  let idofuser;
  // @ts-ignore
  let idoforder;
  beforeAll(async () => {
    const u = await user_entity.create(test_user);
    idofuser = u.id;
    const res = await request
      .post('/authenticate')
      .set('Content-type', 'application/json')
      .send({
        username: 'testapi',
        password: 'secret',
      });
    token = res.body.token;
  });
  afterAll(async () => {
    // @ts-ignore
    const connection = await client.connect();
    const sql =
      'DELETE FROM orders; \n ALTER SEQUENCE orders_id_seq RESTART WITH 1;\n DELETE FROM users; \n ALTER SEQUENCE users_id_seq RESTART WITH 1;\n';
    await connection.query(sql);
    connection.release();
  });
  it('testing create to create order', async () => {
    const res = await request
      .post('/orders')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        status: true,
        // @ts-ignore
        user_id: idofuser,
      });
    idoforder = res.body.id;
    expect(res.body.status).toBe(true);
  });
  it('testing show to get order by id', async () => {
    const res = await request
      // @ts-ignore
      .get(`/orders/${idoforder}`)
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    expect(res.body.status).toBe(true);
  });
  it('testing getorderbyuserid to get order by userid', async () => {
    const res = await request
      // @ts-ignore
      .get(`/orders/${idofuser}`)
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    expect(res.body.status).toBe(true);
  });
  it('testing index to get all orders', async () => {
    const res = await request
      .get('/orders')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    expect(res.body.length).toBe(1);
  });
});
