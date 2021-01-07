const User = require('../models/user.model');

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
    const user = await User.findOne({ email });

    // verify password
    const isValidPassword = await user.validPassword(password);
    if (!user || !isValidPassword) {
      return res.status(401).json({
        status: 'failed',
        message: 'Invalid email or password',
      });
    }

    // send token
    const token = user.generateJwt();

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
