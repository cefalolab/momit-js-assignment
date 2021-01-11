const mongoose = require('mongoose');

// models
const Variant = require('./variant.model');

const productSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, versionKey: false, toJSON: { virtuals: true } }
);

productSchema.virtual('variants', {
  ref: Variant,
  localField: 'id',
  foreignField: 'productId',
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
