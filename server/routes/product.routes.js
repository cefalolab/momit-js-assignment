const express = require('express');

const router = express.Router();

// controllers
const productController = require('../controllers/product.controller');

// routes
router.route('/products').get(productController.getProducts);
router.route('/products/:id').get(productController.getProduct);

module.exports = router;
