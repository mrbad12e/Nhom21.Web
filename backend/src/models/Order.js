const db = require('../config/database');

class Order {
  constructor(data) {
    this.validate(data);

    this.id = data.id;
    this.customerId = data.customer_id || data.customerId;
    this.totalPrice = parseFloat(data.total_price || data.totalPrice);
    this.shippingAddress = data.shipping_address || data.shippingAddress;
    this.orderStatus = data.order_status || data.orderStatus;
    this.paymentStatus = data.payment_status || data.paymentStatus;
    this.createdAt = data.created_at || data.createdAt;
    this.items = data.items || [];
  }

  // Kiểm tra tính hợp lệ của các thông tin đơn hàng
  validate(order) {
    const validationErrors = [];

    if (!order.customer_id) {
      validationErrors.push('Customer ID is required');
    }

    if (!this.isValidStatus(order.order_status)) {
      validationErrors.push('Invalid order status');
    }

    if (!this.isValidPaymentStatus(order.payment_status)) {
      validationErrors.push('Invalid payment status');
    }

    if (parseFloat(order.total_price) < 0) {
      validationErrors.push('Invalid total price');
    }

    if (validationErrors.length > 0) {
      throw new Error(validationErrors.join(', '));
    }

    return true;
  }

  static getValidStatuses() {
    return ['PENDING', 'SHIPPED', 'DELIVERED', 'CANCELED'];
  }

  static getValidPaymentStatuses() {
    return ['PENDING', 'COMPLETED', 'FAILED'];
  }

  isValidStatus(status) {
    return Order.getValidStatuses().includes(status);
  }

  isValidPaymentStatus(status) {
    return Order.getValidPaymentStatuses().includes(status);
  }

  // Tạo đơn hàng từ giỏ hàng
  static async createOrderFromCart(userId, shippingAddress) {
    try {
      const query = `
        SELECT * from public.create_order_from_cart($1, $2);
      `;
      const result = await db.query(query, [userId, shippingAddress]);
      console.log(result);
  
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
    if (result.rowCount === 0) {
      throw new Error('Order not found');
    }
    console.log(result);
    return result[0].getOrderById;
    } catch (err) {
      console.error('Get order by ID error:', err);
      throw err;
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
      console.log(result);
    } catch (err) {
      console.error('Create payment error:', err);
      throw err;
    }
  }

  static async getCustomerPayments(userId, limit = 50, offset = 0) {
    try {
      const query = `
        SELECT * 
        FROM public.get_customer_payments($1, $2, $3);
    `;
        const result = await db.query(query, [userId, limit, offset]);
        console.log(result);
        return result[0].getCustomerPayments;
    } catch (error) {
        throw new Error(`Error fetching customer payments: ${error.message}`);
    }
}

  static generateOrderId() {
    return Math.random().toString(36).substr(2, 16).toUpperCase();
  }

  static generateOrderItemId() {
    return Math.random().toString(36).substr(2, 24).toUpperCase();
  }
}

module.exports = Order;