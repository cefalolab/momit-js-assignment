const User = require('../models/user.model');

exports.register = async (req, res) => {
  try {
    const user = await User.create(req.body);

    // remove password from response
    user.password = undefined;

    res.status(201).json({
      status: 'success',
      data: {
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
