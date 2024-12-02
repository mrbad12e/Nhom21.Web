const db = require('../config/database');

class Cart {
  constructor(data) {
    this.id = data.id;
    this.customerId = data.customer_id || data.customerId;
    this.createdAt = data.created_at || data.createdAt;
    this.items = data.items || [];
  }

  static async createCart(customerId) {
    try {
      const query = 'INSERT INTO carts (id, customer_id) VALUES ($1, $2) RETURNING *';
      const id = this.generateCartId(); // Implement cart ID generation
      const result = await db.query(query, [id, customerId]);
      return result.rows[0];
    } catch (err) {
      console.error('Cart creation error:', err);
      throw new Error('Failed to create cart');
    }
  }

  static async addProductToCart(cartId, productId, quantity = 1) {
    if (quantity <= 0) {
      throw new Error('Quantity must be greater than 0');
    }
    try {
      const query = `
        INSERT INTO cart_items (id, cart_id, product_id, quantity) 
        VALUES ($1, $2, $3, $4) 
        ON CONFLICT (cart_id, product_id) 
        DO UPDATE SET quantity = cart_items.quantity + $4
        RETURNING *
      `;
      const id = this.generateCartItemId(); // Implement cart item ID generation
      const result = await db.query(query, [id, cartId, productId, quantity]);
      return result.rows[0];
    } catch (err) {
      console.error('Add to cart error:', err);
      throw new Error('Failed to add product to cart');
    }
  }

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

  static async removeProductFromCart(cartId, productId) {
    try {
      const query = 'DELETE FROM cart_items WHERE cart_id = $1 AND product_id = $2';
      await db.query(query, [cartId, productId]);
    } catch (err) {
      console.error('Remove from cart error:', err);
      throw new Error('Failed to remove product from cart');
    }
  }

  static generateCartId() {
    return Math.random().toString(36).substr(2, 16).toUpperCase();
  }

  static generateCartItemId() {
    return Math.random().toString(36).substr(2, 24).toUpperCase();
  }
}

module.exports = Cart;