// @ts-ignore
import Client from '../database';

export type order = {
  id?: number;
  status: boolean;
  user_id: number;
};

export class orderentity {
  async index(): Promise<order[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT * FROM orders';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`);
    }
  }
  async getorderbyid(id: string): Promise<order> {
    try {
      const sql = 'SELECT * FROM orders WHERE id=($1)';
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order ${id}. Error: ${err}`);
    }
  }
  async getorderbyuserid(id: string): Promise<order> {
    try {
      const sql = 'SELECT * FROM orders WHERE user_id=($1)';
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order ${id}. Error: ${err}`);
    }
  }
  async create(o: order): Promise<order> {
    try {
      const sql =
        'INSERT INTO orders (status,user_id) VALUES($1, $2) RETURNING *';
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [o.status, o.user_id]);
      const createdorder = result.rows[0];
      conn.release();
      return createdorder;
    } catch (err) {
      throw new Error(`Could not add new order ${o.id}. Error: ${err}`);
    }
  }
  async delete(id: string): Promise<order> {
    try {
      const sql = 'DELETE FROM orders WHERE id=($1)';
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      const deletedproduct = result.rows[0];
      conn.release();
      return deletedproduct;
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    }
  }
}
