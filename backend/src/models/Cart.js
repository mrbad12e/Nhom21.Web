const db = require('../config/database');

class Cart {
  constructor(data) {
    this.id = data.id;
    this.userId = data.customer_id || data.userId;
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
  static async updateCartItemQuantity(userId, productId, quantity) {
    try {
      // Câu lệnh SQL gọi thủ tục
      const query = `
        CALL public.update_cart_item_quantity($1, $2, $3);
      `;
      
      // Thực hiện truy vấn với các tham số
      const result = await db.query(query, [userId, productId, quantity]);
      
      // Kiểm tra kết quả trả về (nếu cần)
      if (result.rowCount === 0) {
        throw new Error('No rows affected. Please check the input data or procedure.');
      }
  
      console.log('Cart item quantity updated successfully.');
    } catch (err) {
      // In ra lỗi chi tiết để dễ dàng xử lý khi debug
      console.error('Update cart item quantity error:', err.message);
      throw new Error('Failed to update cart item quantity: ${err.message}');
    }
  }
  

  // Lấy danh sách sản phẩm trong giỏ hàng
  static async getCartItems(userId) {
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
      const result = await db.query(query, [userId]);
      return result.rows;
    } catch (err) {
      console.error('Fetch cart items error:', err);
      throw new Error('Failed to fetch cart items');
    }
  }

  // Xóa sản phẩm khỏi giỏ hàng
  static async removeProductFromCart(userId, productId) {
    try {
      // Lấy cart_id từ bảng carts dựa trên userId
      const query = `
        DELETE FROM public.cart_items 
        WHERE cart_id = (
          SELECT id FROM public.carts WHERE customer_id = $1 LIMIT 1
        ) 
        AND product_id = $2;
      `;
      
      const result = await db.query(query, [userId, productId]);
  
      // Kiểm tra nếu không có dòng nào bị xóa (giỏ hàng hoặc sản phẩm không tồn tại)
      if (result.rowCount === 0) {
        throw new Error('No matching cart or product found');
      }
    } catch (err) {
      console.error('Remove from cart error:', err);
      throw new Error('Failed to remove product from cart');
    }
  }
  
}

module.exports = Cart;