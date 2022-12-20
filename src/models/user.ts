// @ts-ignore
import Client from '../database';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
export type user = {
  id?: number;
  user_name: string;
  first_name: string;
  second_name: string;
  password: string;
};

export class userentity {
  async index(): Promise<user[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }

  async getuserbyusername(username: string): Promise<user> {
    try {
      const sql = 'SELECT * FROM users WHERE user_name=($1)';
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [username]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${username}. Error: ${err}`);
    }
  }
  async create(u: user): Promise<user> {
    try {
      const sql =
        'INSERT INTO users (user_name, first_name, second_name, password) VALUES($1, $2, $3, $4) RETURNING *';
      // @ts-ignore
      const conn = await Client.connect();
      // @ts-ignore
      const hashed_password = bcrypt.hashSync(
        u.password + BCRYPT_PASSWORD,
        parseInt(SALT_ROUNDS as string)
      );
      const result = await conn.query(sql, [
        u.user_name,
        u.first_name,
        u.second_name,
        hashed_password,
      ]);
      const createduser = result.rows[0];
      conn.release();
      return createduser;
    } catch (err) {
      throw new Error(`Could not add new user ${u.user_name}. Error: ${err}`);
    }
  }
  async delete(user_name: string): Promise<user> {
    try {
      const sql = 'DELETE FROM users WHERE user_name=($1)';
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [user_name]);
      const deleteeduser = result.rows[0];
      conn.release();
      return deleteeduser;
    } catch (err) {
      throw new Error(`Could not delete user ${user_name}. Error: ${err}`);
    }
  }
  async authenticate(username: string, password: string): Promise<user | null> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT password FROM users WHERE user_name=($1)';
      const result = await conn.query(sql, [username]);
      if (result.rows.length) {
        const user = result.rows[0];
        const passwordcorrect: boolean = bcrypt.compareSync(
          password + BCRYPT_PASSWORD,
          user.password
        );
        if (passwordcorrect) {
          const userr = await conn.query(
            'SELECT * FROM users WHERE user_name=($1)',
            [username]
          );
          return userr.rows[0];
        }
      }
      conn.release();
      return null;
    } catch (err) {
      throw new Error(`Could not authenticare user ${username}. Error: ${err}`);
    }
  }
}
