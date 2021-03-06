const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

const { JWT_SECRET } = process.env;

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user
    if (!email || !password) {
      return res.status(400).json({
        status: 'failed',
        message: 'Please provide email and password',
      });
    }

    const user = await User.findOne({ email }).select('-createdAt -updatedAt');

    if (!user) {
      return res.status(401).json({
        status: 'failed',
        message: 'Invalid email or password',
      });
    }

    // verify password
    const isValidPassword = await user.validPassword(password);
    if (!isValidPassword) {
      return res.status(401).json({
        status: 'failed',
        message: 'Invalid email or password',
      });
    }

    // send token
    const token = user.generateJwt();

    // remove password from response
    user.password = undefined;

    res.status(200).json({
      status: 'success',
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      error,
    });
  }
};

exports.isAuthorized = async (req, res, next) => {
  try {
    // check token exist
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        status: 'failed',
        message: 'You are not logged in! Please log in to get access.',
      });
    }

    // verify token
    const user = jwt.verify(token, JWT_SECRET);

    // user still exists
    const currentUser = await User.findById(user.id);
    if (!currentUser) {
      return res.status(401).json({
        status: 'failed',
        message: 'The user belonging to this token does no longer exist.',
      });
    }
    next();
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      error: 'Invalid Token',
    });
  }
};
