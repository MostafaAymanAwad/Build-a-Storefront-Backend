// @ts-ignore
import Client from '../database';
export type order_product = {
  id?: number;
  quantity: number;
  order_id: number;
  product_id: number;
};
export class order_productentity {
  async addProducttoanorder(
    neworder_product: order_product
  ): Promise<order_product> {
    try {
      const ordersql = 'SELECT * FROM orders WHERE id=($1)';
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(ordersql, [neworder_product.order_id]);
      const order = result.rows[0];
      if (order.status === false) {
        // complete order
        throw new Error(
          `Could not add product ${neworder_product.product_id} to order ${neworder_product.order_id} because order status is complete`
        );
      }
      conn.release();
    } catch (err) {
      throw new Error(
        `Could not find this order ${neworder_product.order_id}, ${err}`
      );
    }
    try {
      const sql =
        'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [
        neworder_product.quantity,
        neworder_product.order_id,
        neworder_product.product_id,
      ]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(
        `Could not add product ${neworder_product.product_id} to order ${neworder_product.order_id}: ${err}`
      );
    }
  }
}
