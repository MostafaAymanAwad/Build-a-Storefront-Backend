// @ts-ignore
import client from '../database';
import { user, userentity } from '../models/user';
import supertest from 'supertest';
import app from '../server';
import { order, orderentity } from '../models/order';
import { product, productentity } from '../models/product';
import { order_product } from '../models/order_products';

const request = supertest(app);
const user_entity = new userentity();
const order_entity = new orderentity();
const product_entity = new productentity();
describe('testing order_products handlers methods', () => {
  let token = '';
  const test_user: user = {
    user_name: 'testapi',
    first_name: 'test',
    second_name: '2',
    password: 'secret',
  };
  let test_product: product = {
    name: 'test_product',
    price: 20,
  };
  // @ts-ignore
  let idofuser;
  // @ts-ignore
  let idofproduct;
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
    const p = await product_entity.create(test_product);
    idofproduct = p.id;
    const o = await order_entity.create({
      status: true,
      user_id: idofuser,
    } as order);
    idoforder = o.id;
  });
  afterAll(async () => {
    // @ts-ignore
    const connection = await client.connect();
    const sql =
      'DELETE FROM order_products; \n ALTER SEQUENCE order_products_id_seq RESTART WITH 1;\n DELETE FROM products; \n ALTER SEQUENCE products_id_seq RESTART WITH 1; \n DELETE FROM orders; \n ALTER SEQUENCE orders_id_seq RESTART WITH 1;\n DELETE FROM users; \n ALTER SEQUENCE users_id_seq RESTART WITH 1;\n';
    await connection.query(sql);
    connection.release();
  });
  it('testing addProducttoanorder', async () => {
    const res = await request
      .post('/order_products')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        quantity: 10,
        // @ts-ignore
        order_id: idoforder,
        // @ts-ignore
        product_id: idofproduct,
      } as order_product);
    expect(res.body.quantity).toBe(10);
  });
});
