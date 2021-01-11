const Product = require('../models/product.model');

exports.checkout = async (req, res) => {
  try {
    const { cart } = req.body;
    // TODO: cart validation
    // find unique product ids
    const ids = [...new Set(cart.map(item => item.id))];

    // find products
    const products = await Product.find({ id: { $in: ids } }).populate(
      'variants'
    );

    // Price, available and selected quantity count per color
    const productsBasicInfo = products.map(({ id, price, variants }) => {
      const quantityAvailablePerColor = {};
      variants.forEach(({ color, quantity }) => {
        quantityAvailablePerColor[color] = quantity;
      });

      const quantitySelectedPerColor = {};
      cart.forEach(item => {
        if (item.id === id) {
          const { color, quantity } = item;
          const currentQuantity = quantitySelectedPerColor.hasOwnProperty(color)
            ? quantitySelectedPerColor[color]
            : 0;
          quantitySelectedPerColor[color] = currentQuantity + quantity;
        }
      });

      return {
        id,
        price,
        quantityAvailable: quantityAvailablePerColor,
        quantitySelected: quantitySelectedPerColor,
      };
    });

    // update cart with quantity left, price and calculate total price
    let finalCart = [];
    let totalPrice = 0;

    finalCart = cart.map(item => {
      const product = productsBasicInfo.find(({ id }) => item.id === id);
      const { price, quantityAvailable, quantitySelected } = product;

      const { color, quantity } = item;
      const quantityLeft = quantityAvailable[color] - quantitySelected[color];

      totalPrice += quantity * price;

      return { ...item, price, quantityLeft };
    });

    res.status(200).json({
      status: 'success',
      data: {
        totalPrice,
        cart: finalCart,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      error,
    });
  }
};
