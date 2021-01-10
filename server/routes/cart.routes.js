const express = require('express');

const { isAuthorized } = require('../controllers/auth.controller');

const cartController = require('../controllers/cart.controller');

const router = express.Router();

router.route('/checkout').post(isAuthorized, cartController.checkout);

module.exports = router;
