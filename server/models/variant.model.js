const mongoose = require('mongoose');
const validator = require('validator');

// models
const Product = require('./product.model');

// helpers
const isInt = number => validator.isInt(String(number));

const variantSchema = new mongoose.Schema(
  {
    productId: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    size: {
      type: [String],
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      validate: [isInt, 'Quantity is not valid integer.'],
    },
  },
  { timestamps: true, versionKey: false, toJSON: { virtuals: true } }
);

variantSchema.virtual('products', {
  ref: Product,
  localField: 'productId',
  foreignField: 'id',
});

const Variant = mongoose.model('Variant', variantSchema);

module.exports = Variant;
