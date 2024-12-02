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

  static async createOrder(orderData) {
    try {
      const query = `
        INSERT INTO orders 
        (id, customer_id, total_price, shipping_address, order_status, payment_status) 
        VALUES ($1, $2, $3, $4, $5, $6) 
        RETURNING *
      `;
      const id = this.generateOrderId();
      const values = [
        id,
        orderData.customerId,
        orderData.totalPrice,
        orderData.shippingAddress,
        orderData.orderStatus || 'PENDING',
        orderData.paymentStatus || 'PENDING'
      ];
      const result = await db.query(query, values);
      return result.rows[0];
    } catch (err) {
      console.error('Order creation error:', err);
      throw new Error('Failed to create order');
    }
  }

  static async createOrderItems(orderId, items) {
    try {
      const query = `
        INSERT INTO order_items 
        (id, order_id, product_id, quantity, price) 
        VALUES ($1, $2, $3, $4, $5)
      `;
      for (const item of items) {
        const id = this.generateOrderItemId();
        await db.query(query, [
          id, 
          orderId, 
          item.productId, 
          item.quantity, 
          item.price
        ]);
      }
    } catch (err) {
      console.error('Order items creation error:', err);
      throw new Error('Failed to create order items');
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