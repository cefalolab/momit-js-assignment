const express = require('express');

const productController = require('../controllers/product.controller');

const router = express.Router();

router.route('/products').get(productController.getProducts);
router.route('/products/:id').get(productController.getProduct);

module.exports = router;
