const db = require('../config/database');

class Review {
  constructor(data) {
    this.orderId = data.order_id;
    this.oldStatus = data.old_status;
    this.newStatus = data.new_status;
    this.changedBy = data.changed_by;
    this.changedAt = data.changed_at;
  }

  // Gọi hàm SQL để lưu trữ thay đổi trạng thái đơn hàng
  static async logOrderStatusChange(orderId, oldStatus, newStatus, changedBy) {
    try {
      const query = `
        SELECT public.log_order_status_change() 
        AS log_result 
        FROM public.orders 
        WHERE id = $1 AND order_status != $2;
      `;
      const result = await db.query(query, [orderId, newStatus]);
      return result.rows[0];
    } catch (err) {
      console.error('Error logging order status change:', err);
      throw new Error('Failed to log order status change');
    }
  }

  // Lấy lịch sử trạng thái của đơn hàng
  static async getOrderStatusHistory(orderId) {
    try {
      const query = `
        SELECT * 
        FROM public.order_status_history 
        WHERE order_id = $1 
        ORDER BY changed_at DESC;
      `;
      const result = await db.query(query, [orderId]);
      return result.rows;
    } catch (err) {
      console.error('Error fetching order status history:', err);
      throw new Error('Failed to fetch order status history');
    }
  }
}

module.exports = Review;
