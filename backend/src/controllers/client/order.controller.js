const OrderService = require('../../services/order.service');

class OrderController {
  // Tạo đơn hàng từ giỏ hàng
  static async createOrder(req, res) {
    try {
      const userId = req.user.userId[0].signin;
      const shippingAddress= req.body;
      
      // Validate required fields
      if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
      }
      if (!shippingAddress) {
        return res.status(400).json({ message: 'Shipping address is required' });
      }

      const orderId = await OrderService.createOrderFromCart(userId, shippingAddress);
      res.status(201).json({ 
        message: 'Order created successfully', 
        orderId 
      });
    } catch (err) {
      console.error('Create order error:', err);
      res.status(400).json({ 
        message: err.message || 'Failed to create order' 
      });
    }
  }

  static async getOrderById(req, res) {
    try {
      const orderId= req.body;
      const userId = req.user.userId[0].signin;
      if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
      }
      if (!orderId) {
        return res.status(400).json({ message: 'Order ID is required' });
      }
      const result = await OrderService.getOrderById(orderId, userId);
      res.status(200).json({result});
    } catch (err) {
      console.error('Get order error:', err.message);
      res.status(404).json({ message: err.message || 'Order not found' });
    }
  }
  
  // Tạo thanh toán cho đơn hàng
  static async createPayment(req, res) {
    try {
      const userId = req.user.userId[0].signin;
      const {orderId, amount, paymentMethod } = req.body;
      if (!orderId) {
        return res.status(400).json({ message: 'Order ID is required' });
      }
      if (!amount || amount <= 0) {
        return res.status(400).json({ message: 'Invalid payment amount' });
      }
      if (!paymentMethod) {
        return res.status(400).json({ message: 'Payment method is required' });
      }
      const paymentId = await OrderService.createPayment(orderId, amount, paymentMethod);
      res.status(201).json({ 
        message: 'Payment created successfully', 
        paymentId 
      });
    } catch (err) {
      console.error('Create payment error:', err);
      res.status(400).json({ 
        message: err.message || 'Failed to create payment' 
      });
    }
  }
}
module.exports = OrderController;