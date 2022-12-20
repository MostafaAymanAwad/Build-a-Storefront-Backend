# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index
  HTTP verb:GET
  url: '/products'
- Show
  HTTP verb:GET
  url: '/products/:id'
- Create [token required]
  HTTP verb:POST
  url: '/products'
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- authenticate
   HTTP verb:POST
   url: '/authenticate'
- Index [token required] 
   HTTP verb:GET
   url: '/users'
- Show [token required] 
  HTTP verb:GET
  url: '/users/:username'
- Create N[token required] 
  HTTP verb:POST
  url: '/users'


#### Orders
- Current Order by user (args: user id)[token required]
  HTTP verb:GET
  url: '/orders/:userid'
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
products schema:
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price FLOAT NOT NULL
);
#### Product
-  id
- name
- price
- [OPTIONAL] category
-----------------------------------------------------
users schema:
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(100) UNIQUE NOT NULL ,
    first_name VARCHAR(100) NOT NULL,
    second_name VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL
);
#### User
- id
- firstName
- lastName
- password
-----------------------------------------------------
orders schema:
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status BOOLEAN,
    user_id bigint REFERENCES users(id)
);
#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)
-----------------------------------------------------
- There is a relation many to many between the orders and the products so we must break this relation into new tabel:
order_products schema:
CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity integer,
    order_id bigint REFERENCES orders(id),
    product_id bigint REFERENCES products(id)
);
