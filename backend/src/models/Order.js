const db = require('../config/database');

class Order {
  // Tạo đơn hàng từ giỏ hàng
  static async createOrderFromCart(userId, shippingAddress) {
    try {
      const query = `
        SELECT * from public.create_order_from_cart($1, $2);
      `;
      const result = await db.query(query, [userId, shippingAddress]);
  
      return result[0].create_order_from_cart;
    }catch (err) {
      throw new Error(err.message);
    }
  }

  // Lấy thông tin đơn hàng theo ID cho người dùng cụ thể
  static async getOrderById(orderId, userId) {
    try {
      const query = `
      SELECT * FROM public.get_order($1, $2);
    `;
    const result = await db.query(query, [orderId, userId]);
    return result[0];
    } catch (err) {
      throw new Error(err.message);
    }
  }

  // Tạo thanh toán cho đơn hàng
  static async createPayment(orderId, amount, paymentMethod) {
    try {
      const query = `
        SELECT public.create_payment($1, $2, $3);
      `;
      const result = await db.query(query, [orderId, amount, paymentMethod]);
      return result[0].create_payment;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  static async getCustomerPayments(userId, limit = 50, offset = 0) {
    try {
      const query = `
        SELECT * 
        FROM public.get_customer_payments($1, $2, $3);
    `;
        const result = await db.query(query, [userId, limit, offset]);
        return result[0].getCustomerPayments;
    } catch (error) {
        throw new Error(`${error.message}`);
    }
  }
}

module.exports = Order;