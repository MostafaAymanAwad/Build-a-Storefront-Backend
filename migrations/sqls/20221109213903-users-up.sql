/* Replace with your SQL commands */
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(100) UNIQUE NOT NULL ,
    first_name VARCHAR(100) NOT NULL,
    second_name VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL
);