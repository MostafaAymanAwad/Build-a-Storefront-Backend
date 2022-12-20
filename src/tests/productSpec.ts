import { product, productentity } from '../models/product';
// @ts-ignore
import client from '../database';
const product_entity = new productentity();

describe('Testing product Model', () => {
  describe('Testing product Model methods to be defined', () => {
    it('should have an index method', () => {
      expect(product_entity.index).toBeDefined();
    });

    it('should have a getproductbyid method', () => {
      expect(product_entity.getproductbyid).toBeDefined();
    });

    it('should have a create method', () => {
      expect(product_entity.create).toBeDefined();
    });

    it('should have a delete method', () => {
      expect(product_entity.delete).toBeDefined();
    });
  });
  describe('Testing product Model methods logic', () => {
    afterAll(async () => {
      // @ts-ignore
      const conn = await client.connect();
      const sql =
        'DELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1;';
      await conn.query(sql);
      conn.release();
    });
    const test_product: product = {
      name: 'test',
      price: 20,
    };
    let createdproduct: product;
    it('create method should add a product', async () => {
      createdproduct = await product_entity.create(test_product);
      test_product.id = createdproduct.id;

      expect(createdproduct.name).toEqual('test');
      expect(createdproduct.price).toEqual(20);
    });
    it('index method should return a list of products', async () => {
      const result = await product_entity.index();
      expect(result.length).toEqual(1);
    });
    it('getproductbyid method should return the correct product', async () => {
      const result = await product_entity.getproductbyid(
        test_product.id as unknown as string
      );
      expect(result.name).toEqual('test');
      expect(result.price).toEqual(20);
    });
    it('delete method should remove the product', async () => {
      const a = await product_entity.delete(
        createdproduct.id as unknown as string
      );
      const result = await product_entity.index();
      expect(result).toEqual([]);
    });
  });
});
