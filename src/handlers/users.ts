import express, { Request, Response } from 'express';
import { user, userentity } from '../models/user';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import validateuser from '../middlewares/validateuser';
dotenv.config();
const { TOKEN_SECRET } = process.env;

const user_entity = new userentity();

const index = async (_req: Request, res: Response) => {
  try {
    const users = await user_entity.index();
    res.json(users);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const user = await user_entity.getuserbyusername(
      req.params.username as unknown as string
    );
    res.json(user);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const newuser: user = {
      user_name: req.body.username,
      first_name: req.body.firstname,
      second_name: req.body.secondname,
      password: req.body.passwrod,
    };
    const createduser = await user_entity.create(newuser);
    res.json(createduser);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const deleteduser = await user_entity.delete(req.body.username);
    res.json(deleteduser);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
};
export const authenticate = async (req: Request, res: Response) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const user = await user_entity.authenticate(username, password);
    const token = jwt.sign({ user: user }, TOKEN_SECRET as unknown as string);
    if (user == null) {
      res.status(401);
      res.json({ message: 'error in username or password' });
    }
    return res.json({ ...user, token });
  } catch (err) {
    res.json(err);
  }
};

const userRoutes = (app: express.Application) => {
  app.get('/users', validateuser, index);
  app.get('/users/:username', validateuser, show);
  app.post('/users',create);
  app.post('/authenticate', authenticate);
  app.delete('/users/:username', validateuser, destroy);
};

export default userRoutes;
