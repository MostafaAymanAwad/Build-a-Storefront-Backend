- The server is running on port 3000

- database is running on port 5432

- To install the package you should run npm install

- To connect to database you should set the .env file with:

POSTGRES_HOST=localhost
POSTGRES_DB=onlinestoredb
POSTGRES_USER=mostafa
POSTGRES_PASSWORD=secret
POSTGRES_TEST_DB=onlinestoredb_test
ENV=dev
SALT_ROUNDS=10
BCRYPT_PASSWORD=say_friend_to_pass
TOKEN_SECRET=secret_token

- note: to run tests you should change ENV to test

