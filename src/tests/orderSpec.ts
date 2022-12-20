// @ts-ignore
import Client from '../database';
import { order, orderentity } from '../models/order';
import { user, userentity } from '../models/user';
const user_entity = new userentity();
const order_entity = new orderentity();

describe('Testing order Model', () => {
  describe('Testing order model methods to be defined', () => {
    it('should have an index method', () => {
      expect(order_entity.index).toBeDefined();
    });

    it('should have a getorderbyid method', () => {
      expect(order_entity.getorderbyid).toBeDefined();
    });

    it('should have a create method', () => {
      expect(order_entity.create).toBeDefined();
    });

    it('should have a delete method', () => {
      expect(order_entity.delete).toBeDefined();
    });
    it('should have a getorderbyuserid method', () => {
      expect(order_entity.getorderbyuserid).toBeDefined();
    });
  });
  describe('Testing order Model methods logic', () => {
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
    });
    afterAll(async () => {
      // @ts-ignore
      const connection = await Client.connect();
      const sql =
        'DELETE FROM orders; \n ALTER SEQUENCE orders_id_seq RESTART WITH 1;\n DELETE FROM users; \n ALTER SEQUENCE users_id_seq RESTART WITH 1;\n';
      await connection.query(sql);
      connection.release();
    });
    it('create method should add an order', async () => {
      const createdorder = await order_entity.create({
        status: true,
        // @ts-ignore
        user_id: idofuser,
      } as order);
      idoforder = createdorder.id;
      expect(createdorder.status).toEqual(true);
    });
    it('index method should return a list of orders', async () => {
      const result = await order_entity.index();
      expect(result.length).toEqual(1);
    });
    it('getorderbyid method should return the correct order', async () => {
      const result = await order_entity.getorderbyid(
        // @ts-ignore
        idoforder as unknown as string
      );
      expect(result.status).toEqual(true);
    });
    it('getorderbyuserid method should return the correct order', async () => {
      const result = await order_entity.getorderbyuserid(
        // @ts-ignore
        idofuser as unknown as string
      );
      expect(result.status).toEqual(true);
    });
    it('delete method should remove the order', async () => {
      // @ts-ignore
      const a = await order_entity.delete(idoforder as unknown as string);
      const result = await order_entity.index();
      expect(result).toEqual([]);
    });
  });
});
