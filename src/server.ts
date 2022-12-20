import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './handlers/users';
import productsRoutes from './handlers/products';
import ordersRoutes from './handlers/orders';
import order_productsRoutes from './handlers/order_products';

const app: express.Application = express();
const address: string = '0.0.0.0:3000';
app.use(cors());
app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!');
});

userRoutes(app);
productsRoutes(app);
ordersRoutes(app);
order_productsRoutes(app);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
export default app;
