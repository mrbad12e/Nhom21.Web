const Cart = require('../models/Cart');

class CartService {
  static async getCart(customerId) {
    return await Cart.getCartItems(customerId);
  }

  static async addProduct(userId, productId, quantity) {
    // Thêm sản phẩm vào giỏ hàng
    await Cart.addProductToCart(userId, productId, quantity);
  }

  static async updateCartItem(cartId, productId, quantity) {
    // Cập nhật số lượng sản phẩm trong giỏ hàng
    await Cart.updateCartItemQuantity(cartId, productId, quantity);
  }

  static async removeProduct(cartId, productId) {
    // Xóa sản phẩm khỏi giỏ hàng
    await Cart.removeProductFromCart(cartId, productId);
  }
}

module.exports = CartService;
