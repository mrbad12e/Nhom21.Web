const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', err);
  }

  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      status: 'error',
      message: err.errors.map((e) => e.message),
    });
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({
      status: 'error',
      message: 'Dữ liệu đã tồn tại',
    });
  }

  res.status(err.statusCode).json({
    status: err.status,
    message:
      process.env.NODE_ENV === 'production'
        ? 'Có lỗi xảy ra, vui lòng thử lại sau'
        : err.message,
  });
};

module.exports = errorHandler;