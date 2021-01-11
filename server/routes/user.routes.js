const express = require('express');

const router = express.Router();

// controllers
const userController = require('../controllers/user.controller');

// routes
router.route('/register').post(userController.register);

module.exports = router;
