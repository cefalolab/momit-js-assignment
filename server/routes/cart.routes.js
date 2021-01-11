const express = require('express');

const router = express.Router();

// controllers
const { isAuthorized } = require('../controllers/auth.controller');
const cartController = require('../controllers/cart.controller');

// routes
router.route('/checkout').post(isAuthorized, cartController.checkout);

module.exports = router;
