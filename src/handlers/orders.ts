import express, { Request, Response } from 'express';
import { order, orderentity } from '../models/order';
import validateuser from '../middlewares/validateuser';
const order_entity = new orderentity();

const index = async (_req: Request, res: Response) => {
  try {
    const orders = await order_entity.index();
    res.json(orders);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const order = await order_entity.getorderbyid(
      req.params.id as unknown as string
    );
    res.json(order);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
};
const showcurrentorderbyuserid = async (req: Request, res: Response) => {
  try {
    const order = await order_entity.getorderbyuserid(
      req.params.user_id as unknown as string
    );
    res.json(order);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const neworder: order = {
      status: req.body.status,
      user_id: req.body.user_id,
    };

    const createdorder = await order_entity.create(neworder);
    res.json(createdorder);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const deletedproduct = await order_entity.delete(req.body.id);
    res.json(deletedproduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const ordersRoutes = (app: express.Application) => {
  app.get('/orders', validateuser, index);
  app.get('/orders/:id', validateuser, show);
  app.get('/orders/:userid', validateuser, showcurrentorderbyuserid);
  app.post('/orders', validateuser, create);
  app.delete('/orders/:id', validateuser, destroy);
};

export default ordersRoutes;
