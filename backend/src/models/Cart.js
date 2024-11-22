const db = require('../config/database');
class Cart {
  constructor(data) {
    this.id = data.id;
    this.customerId = data.customerId;
    this.createdAt = data.createdAt;
    this.items = data.items || []; // Danh sách sản phẩm trong giỏ hàng
  }

  /**
   * Thêm sản phẩm vào giỏ hàng
   * @param {string} userId - ID của người dùng
   * @param {number} productId - ID của sản phẩm
   * @param {number} quantity - Số lượng sản phẩm
   */
  static async addProductToCart(userId, productId, quantity) {
    if (quantity <= 0) {
      throw new Error('Quantity must be greater than 0');
    }
    try {
      const query = `CALL public.add_product_to_cart($1, $2, $3)`;
      await db.query(query, [userId, productId, quantity]);
    } catch (err) {
      throw new Error('Error adding product to cart: ' + err.message);
    }
  }

  /**
   * Lấy danh sách sản phẩm trong giỏ hàng của người dùng
   * @param {string} userId - ID của người dùng
   * @returns {Promise<Array>} - Danh sách sản phẩm trong giỏ hàng
   */
  static async getCartItems(userId) {
    try {
      const query = `
        SELECT ci.id AS cart_item_id, ci.quantity, 
               p.id AS product_id, p.name AS product_name, 
               p.price, p.stock, p.image_url
        FROM cart_items ci
        JOIN carts c ON ci.cart_id = c.id
        JOIN products p ON ci.product_id = p.id
        WHERE c.customer_id = $1
      `;
      const result = await db.query(query, [userId]);
      return result.rows;
    } catch (err) {
      throw new Error('Error fetching cart items: ' + err.message);
    }
  }
}

module.exports = Cart;
