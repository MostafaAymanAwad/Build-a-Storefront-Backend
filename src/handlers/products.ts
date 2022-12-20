import express, { Request, Response } from 'express';
import { product, productentity } from '../models/product';
import validateuser from '../middlewares/validateuser';
const product_entity = new productentity();

const index = async (_req: Request, res: Response) => {
  try {
    const products = await product_entity.index();
    res.json(products);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const product = await product_entity.getproductbyid(
      req.params.id as unknown as string
    );
    res.json(product);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const newproduct: product = {
      name: req.body.name,
      price: req.body.price,
    };
    const createdproduct = await product_entity.create(newproduct);
    res.json(createdproduct);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const deletedproduct = await product_entity.delete(req.body.id);
    res.json(deletedproduct);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
};

const productsRoutes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', validateuser, create);
  app.delete('/products/:id', validateuser, destroy);
};

export default productsRoutes;
