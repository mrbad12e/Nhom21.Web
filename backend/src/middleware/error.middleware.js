
// Middleware xử lý lỗi
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Xác định mã trạng thái HTTP
  const statusCode = err.status || 500;

  // Trả về phản hồi JSON chứa thông tin lỗi
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack, // Ẩn stack trace trong môi trường production
  });
};


// Middleware cho các route không xác định
const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
};


module.exports = { errorHandler, notFoundHandler };
