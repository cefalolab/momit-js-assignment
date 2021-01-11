const express = require('express');

const router = express.Router();

// controllers
const authController = require('../controllers/auth.controller');

// routes
router.route('/login').post(authController.login);

module.exports = router;
