const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const ProductModel = require('../models/product.model');
const VariantModel = require('../models/variant.model');

// check .env exist
if (dotenv.error) {
  throw dotenv.error;
}

// read JSON file
const products = JSON.parse(
  fs.readFileSync(`${__dirname}/products.json`, 'utf-8')
);
const variants = JSON.parse(
  fs.readFileSync(`${__dirname}/variants.json`, 'utf-8')
);

const actions = async () => {
  try {
    await ProductModel.deleteMany();
    await VariantModel.deleteMany();
    console.log('DELETE COMPLETE');
    await ProductModel.create(products);
    await VariantModel.create(variants);
    console.log('IMPORT COMPLETE');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// Database connection
const { DATABASE_URI } = process.env;
mongoose
  .connect(DATABASE_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection successful.');
    // Delete existing data then insert new data
    actions();
  })
  .catch(err => {
    console.error('DB connection fail.', err);
  });
