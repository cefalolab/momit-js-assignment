const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'E-mail is required.'],
      validate: [validator.isEmail, 'E-mail is not valid.'],
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
      minlength: 8,
    },
  },
  { timestamps: true, versionKey: false }
);

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.validPassword = function (inputPassword) {
  return bcrypt.compare(inputPassword, this.password);
};

userSchema.methods.generateJwt = function () {
  const payload = {
    id: this._id,
    email: this.email,
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
