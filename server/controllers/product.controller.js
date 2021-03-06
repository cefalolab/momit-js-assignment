const Product = require('../models/product.model');

exports.getProducts = async (_, res) => {
  try {
    const products = await Product.find().select('id name');

    res.status(200).json({
      status: 'success',
      data: {
        products,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'failed',
      error,
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const product = await Product.findOne({ id }).populate('variants');

    // for invalid id
    if (!product) {
      return res.status(404).json({
        status: 'failed',
        message: `No product found with this ${id}`,
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        product,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      error,
    });
  }
};
