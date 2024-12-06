const db = require('../config/database');

class Cart {
  constructor(data) {
    this.id = data.id;
    this.customerId = data.customer_id || data.customerId;
    this.createdAt = data.created_at || data.createdAt;
    this.items = data.items || [];
  }

  // Thêm sản phẩm vào giỏ hàng
  static async addProductToCart(userId, productId, quantity) {
    if (quantity <= 0) {
      throw new Error('Quantity must be greater than 0');
    }
    try {
      const query = `
        CALL public.add_product_to_cart($1, $2, $3);
      `;
      await db.query(query, [userId, productId, quantity]);
    } catch (err) {
      console.error('Add to cart error:', err);
      throw new Error(err.message); // Sử dụng lỗi từ procedure
    }
  }

  // Cập nhật số lượng sản phẩm trong giỏ hàng
  static async updateCartItemQuantity(cartId, productId, quantity) {
    try {
      const query = `
        CALL public.update_cart_item_quantity($1, $2, $3);
      `;
      await db.query(query, [cartId, productId, quantity]);
    } catch (err) {
      console.error('Update cart item quantity error:', err);
      throw new Error(err.message); // Trả về thông báo lỗi từ procedure
    }
  }

  // Lấy danh sách sản phẩm trong giỏ hàng
  static async getCartItems(customerId) {
    try {
      const query = `
        SELECT ci.id AS cart_item_id, ci.quantity, 
               p.id AS product_id, p.name AS product_name, 
               p.price, p.stock, p.image_urls
        FROM cart_items ci
        JOIN carts c ON ci.cart_id = c.id
        JOIN products p ON ci.product_id = p.id
        WHERE c.customer_id = $1
      `;
      const result = await db.query(query, [customerId]);
      return result.rows;
    } catch (err) {
      console.error('Fetch cart items error:', err);
      throw new Error('Failed to fetch cart items');
    }
  }

  // Xóa sản phẩm khỏi giỏ hàng
  static async removeProductFromCart(cartId, productId) {
    try {
      const query = `
        DELETE FROM cart_items 
        WHERE cart_id = $1 AND product_id = $2
      `;
      await db.query(query, [cartId, productId]);
    } catch (err) {
      console.error('Remove from cart error:', err);
      throw new Error('Failed to remove product from cart');
    }
  }
}

module.exports = Cart;