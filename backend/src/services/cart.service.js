const Cart = require('../models/Cart');

const addProductToCart = async (userId, productId, quantity) => {
  try {
    await Cart.addProductToCart(userId, productId, quantity);
    return { message: 'Product added to cart successfully' };
  } catch (err) {
    throw new Error(err.message);
  }
};

const getCartItems = async (userId) => {
  try {
    return await Cart.getCartItems(userId);
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  addProductToCart,
  getCartItems,
};
