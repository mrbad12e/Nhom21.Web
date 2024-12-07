const OrderController = require('../src/controllers/client/order.controller');
const OrderService = require('../src/services/order.service');

// Mock the OrderService completely
jest.mock('../src/services/order.service');

describe('OrderController', () => {
  // Common mock objects for request and response
  let mockReq, mockRes;

  // Setup mock request and response before each test
  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();

    // Create mock request object
    mockReq = {
      body: {},
      params: {},
      query: {},
      user: { id: 'USER-123' }
    };

    // Create mock response object
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  describe('createOrder', () => {
    test('should create order successfully', async () => {
      // Setup mock request
      mockReq.body = {
        userId: 'USER-123',
        shippingAddress: '123 Test Street'
      };

      // Mock OrderService method
      OrderService.createOrderFromCart.mockResolvedValue('ORDER-456');

      // Call the method
      await OrderController.createOrder(mockReq, mockRes);

      // Verify interactions
      expect(OrderService.createOrderFromCart).toHaveBeenCalledWith('USER-123', '123 Test Street');
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Order created successfully',
        orderId: 'ORDER-456'
      });
    });

    test('should return 400 if userId is missing', async () => {
      // Setup mock request without userId
      mockReq.body = {
        shippingAddress: '123 Test Street'
      };

      // Call the method
      await OrderController.createOrder(mockReq, mockRes);

      // Verify interactions
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'User ID is required'
      });
    });

    test('should return 400 if service throws an error', async () => {
      // Setup mock request
      mockReq.body = {
        userId: 'USER-123',
        shippingAddress: '123 Test Street'
      };

      // Mock OrderService to throw an error
      OrderService.createOrderFromCart.mockRejectedValue(new Error('Service error'));

      // Call the method
      await OrderController.createOrder(mockReq, mockRes);

      // Verify interactions
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Service error'
      });
    });
  });

  describe('getOrderById', () => {
    test('should retrieve order successfully', async () => {
      // Setup mock request
      mockReq.params = { orderId: 'ORDER-456' };

      // Mock OrderService method
      const mockOrder = { id: 'ORDER-456', total: 100 };
      OrderService.getOrderById.mockResolvedValue(mockOrder);

      // Call the method
      await OrderController.getOrderById(mockReq, mockRes);

      // Verify interactions
      expect(OrderService.getOrderById).toHaveBeenCalledWith('ORDER-456', 'USER-123');
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockOrder);
    });

    test('should return 404 for order not found', async () => {
      // Setup mock request
      mockReq.params = { orderId: 'ORDER-456' };

      // Mock OrderService to throw a not found error
      const notFoundError = new Error('Order not found or access denied');
      OrderService.getOrderById.mockRejectedValue(notFoundError);

      // Call the method
      await OrderController.getOrderById(mockReq, mockRes);

      // Verify interactions
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Order not found or access denied'
      });
    });
  });

  describe('getCustomerOrders', () => {
    test('should retrieve customer orders successfully', async () => {
      // Setup mock request with query parameters
      mockReq.query = {
        limit: '10',
        offset: '0',
        status: 'PENDING'
      };

      // Mock OrderService method
      const mockOrders = [{ id: 'ORDER-1' }, { id: 'ORDER-2' }];
      OrderService.getCustomerOrders.mockResolvedValue(mockOrders);

      // Call the method
      await OrderController.getCustomerOrders(mockReq, mockRes);

      // Verify interactions
      expect(OrderService.getCustomerOrders).toHaveBeenCalledWith('USER-123', {
        limit: 10,
        offset: 0,
        status: 'PENDING'
      });
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        total: 2,
        orders: mockOrders
      });
    });
  });

  describe('createPayment', () => {
    test('should create payment successfully', async () => {
      // Setup mock request
      mockReq.body = {
        orderId: 'ORDER-456',
        amount: 100.50,
        paymentMethod: 'CREDIT_CARD'
      };

      // Mock OrderService method
      OrderService.createPayment.mockResolvedValue('PAYMENT-789');

      // Call the method
      await OrderController.createPayment(mockReq, mockRes);

      // Verify interactions
      expect(OrderService.createPayment).toHaveBeenCalledWith(
        'ORDER-456', 
        100.50, 
        'CREDIT_CARD', 
        'USER-123'
      );
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Payment created successfully',
        paymentId: 'PAYMENT-789'
      });
    });

    test('should return 400 if orderId is missing', async () => {
      // Setup mock request without orderId
      mockReq.body = {
        amount: 100.50,
        paymentMethod: 'CREDIT_CARD'
      };

      // Call the method
      await OrderController.createPayment(mockReq, mockRes);

      // Verify interactions
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Order ID is required'
      });
    });
  });

  describe('getCustomerPayments', () => {
    test('should retrieve customer payments successfully', async () => {
      // Setup mock request with query parameters
      mockReq.query = {
        limit: '10',
        offset: '0'
      };

      // Mock OrderService method
      const mockPayments = [{ id: 'PAYMENT-1' }, { id: 'PAYMENT-2' }];
      OrderService.getCustomerPayments.mockResolvedValue(mockPayments);

      // Call the method
      await OrderController.getCustomerPayments(mockReq, mockRes);

      // Verify interactions
      expect(OrderService.getCustomerPayments).toHaveBeenCalledWith('USER-123', {
        limit: 10,
        offset: 0
      });
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        total: 2,
        payments: mockPayments
      });
    });
  });
});