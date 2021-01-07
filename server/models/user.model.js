const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

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

const User = mongoose.model('User', userSchema);

module.exports = User;
