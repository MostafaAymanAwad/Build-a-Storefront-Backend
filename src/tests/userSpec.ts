// @ts-ignore
import client from '../database';
import { user, userentity } from '../models/user';

const user_entity = new userentity();

describe('Testing user Model', () => {
  describe('Testing user Model methods to be defined', () => {
    it('should have an index method', () => {
      expect(user_entity.index).toBeDefined();
    });

    it('should have a getuserbyusername method', () => {
      expect(user_entity.getuserbyusername).toBeDefined();
    });

    it('should have a create method', () => {
      expect(user_entity.create).toBeDefined();
    });

    it('should have a delete method', () => {
      expect(user_entity.delete).toBeDefined();
    });
  });
  describe('Testing user Model methods logic', () => {
    afterAll(async () => {
      // @ts-ignore
      const connection = await client.connect();
      const sql =
        'DELETE FROM users; \n ALTER SEQUENCE users_id_seq RESTART WITH 1;';
      await connection.query(sql);
      connection.release();
    });
    const test_user: user = {
      user_name: 'test123',
      first_name: 'test',
      second_name: '1',
      password: 'password123',
    };
    it('create method should add a user', async () => {
      const createduser = await user_entity.create(test_user);
      test_user.id = createduser.id;
      expect(createduser.user_name).toEqual('test123');
      expect(createduser.first_name).toEqual('test');
    });
    it('authenticate method should return authenticated user', async () => {
      const authenticated_user = await user_entity.authenticate(
        'test123',
        'password123'
      );
      // @ts-ignore
      expect(authenticated_user.user_name).toEqual('test123');
      // @ts-ignore
      expect(authenticated_user.first_name).toEqual('test');
    });
    it('authenticate method should return null when passing incorrect data', async () => {
      const authenticated_user = await user_entity.authenticate(
        'wrong_username',
        'wrong_password'
      );
      expect(authenticated_user).toBe(null);
    });
    it('index method should return a list of users', async () => {
      const result = await user_entity.index();
      expect(result.length).toEqual(1);
    });
    it('getuserbyusername method should return the correct user', async () => {
      const result = await user_entity.getuserbyusername(test_user.user_name);
      expect(result.user_name).toEqual('test123');
      expect(result.first_name).toEqual('test');
    });
    it('delete method should remove the user', async () => {
      const a = await user_entity.delete('test123');
      const result = await user_entity.index();
      expect(result).toEqual([]);
    });
  });
});
