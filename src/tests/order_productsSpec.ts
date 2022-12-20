import { order_product, order_productentity } from '../models/order_products';
// @ts-ignore
import client from '../database';
import { user, userentity } from '../models/user';
import { order, orderentity } from '../models/order';
import { product, productentity } from '../models/product';

const oder_product_entity = new order_productentity();
const user_entity = new userentity();
const order_entity = new orderentity();
const product_entity = new productentity();
describe('Testing order_product Model', () => {
  describe('Testing order_product Model methods to be defined', () => {
    it('should have an addProducttoanorder method', () => {
      expect(oder_product_entity.addProducttoanorder).toBeDefined();
    });
  });
  describe('Testing order_product Model methods logic', () => {
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
    it('should return order_product', async () => {
      const created_order_product =
        await oder_product_entity.addProducttoanorder({
          quantity: 6,
          // @ts-ignore
          order_id: idoforder,
          // @ts-ignore
          product_id: idofproduct,
        } as order_product);
      expect(created_order_product.quantity).toEqual(6);
    });
  });
});
