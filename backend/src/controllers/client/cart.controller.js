const Cart = require('../models/Cart');

const addProductToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    await Cart.addProductToCart(userId, productId, quantity);
    res.status(200).json({ message: 'Product added to cart successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getCartItems = async (req, res) => {
  const userId = req.params.userId;

  try {
    const cartItems = await Cart.getCartItems(userId);
    res.status(200).json(cartItems);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  addProductToCart,
  getCartItems,
};
