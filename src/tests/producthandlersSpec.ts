// @ts-ignore
import client from '../database';
import { user, userentity } from '../models/user';
import supertest from 'supertest';
import app from '../server';
import { product, productentity } from '../models/product';

const product_entity = new productentity();

const request = supertest(app);
const user_entity = new userentity();

describe('testing product handlers methods', () => {
  let token = '';
  const test_user: user = {
    id: 9,
    user_name: 'testapi',
    first_name: 'test',
    second_name: '2',
    password: 'secret',
  };
  const test_product: product = {
    name: 'test2product',
    price: 20,
  };
  // @ts-ignore
  let id;
  beforeAll(async () => {
    await user_entity.create(test_user);
    const prod = await product_entity.create(test_product);
    id = prod.id;
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
      'DELETE FROM users; \n ALTER SEQUENCE users_id_seq RESTART WITH 1;\n DELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1;';
    await connection.query(sql);
    connection.release();
  });
  it('testing create to create product', async () => {
    const res = await request
      .post('/products')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'test_product',
        price: 20,
      });
    expect(res.body.name).toBe('test_product');
  });
  it('testing show to get product by id', async () => {
    const res = await request
      // @ts-ignore
      .get(`/products/${id}`)
      .set('Content-type', 'application/json');
    expect(res.body.name).toBe('test2product');
  });
  it('testing index to get all products', async () => {
    const res = await request
      .get('/products')
      .set('Content-type', 'application/json');
    expect(res.body.length).toBe(2);
  });
});
