import express, { Request, Response } from 'express';
import { order_product, order_productentity } from '../models/order_products';
import validateuser from '../middlewares/validateuser';
const order_product_entity = new order_productentity();
const addProducttoanorder = async (req: Request, res: Response) => {
  try {
    const neworder_product: order_product = {
      quantity: req.body.quantity,
      order_id: req.body.order_id,
      product_id: req.body.product_id,
    };
    const createdorder_product = await order_product_entity.addProducttoanorder(
      neworder_product
    );
    res.json(createdorder_product);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
};

const order_productsRoutes = (app: express.Application) => {
  app.post('/order_products', validateuser, addProducttoanorder);
};

export default order_productsRoutes;
