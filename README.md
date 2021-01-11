## Assignment for _Cefalo_ full stack web developer

### Feature

This is a simple e-commerce website.

- Back-End
  - `/registration` : create new user
  - `/login` : user authentication.
  - `/products` : retrieve products with name and only.
  - `/products/:id` : retrieve single product details.
  - `/checkout` : verify cart items values and calculate total price.
- Front-End:
  - _Header_ is available for all pages with counting cart items and user info menu.
  - _Product Details_ modal view to select variants of a product and add to cart option.
  - Pages -
    - `/` : product list
    - `/login` : user login
    - `/register` : user registration
    - `/checkout` : cart list view including modification of quantity.

### Built With

MERN (MongoDB, Experss, React, Node) stack development.

- Language: JavaScript, HTML, CSS
- Database: MongoDB
- Framework/Library:
  - Server Side: Express, JSON Web Token, Mongoose, Mocha, Chai
  - Client Side: React, React Router Dom, Chakra UI, Redux

For more details about third party packages checkout [`package.json`](https://github.com/momitrahman/momit-full-stack-js-assignment/blob/master/package.json)

### Get Started

**In your operating system must ensure that Node.js (>= 12.x) and MongoDB (>= 4.4) already installed.**

1. Clone this [repository](https://github.com/momitrahman/momit-full-stack-js-assignment)
2. Copy `.env.example` as `.env`. Now setup environment variable.
3. Install dependency `npm install`
4. Seed data into database `npm run seed`
5. Run application:
   - For development: set `NODE_ENV="development"` in `.env` file then run `npm start`. It will watch both server and client side changes.
   - For production: set `NODE_ENV="production"` in `.env` file then run `npm run prod`. It will build client side later will run server.
   - For test: set `NODE_ENV="test"` in `.env` file then run `npm run test`.

### Basic Folder Structure

    ├── client
    │   ├── components      # markup without state.
    │   ├── containers      # markup with state.
    │   ├── helpers         # common utility functions
    │   ├── pages           # markup with layout
    │   ├── redux           # global state store
    │   ├── routes          # route paths
    │   ├── index.html
    │   ├── app.js
    │   ├── index.js
    ├── server
    │   ├── controllers     # request and response handlers
    │   ├── model           # database models (collections)
    │   ├── routes          # URL endpoints
    │   ├── seed            # database seeder
    │   ├── test            # API test
    │   ├── app.js
    ├── .env.example
    ├── server.js
    ├── package.json

### Author

[Momit Rahman](www.momit.dev)
