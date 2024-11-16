// app.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const nodemailer = require('nodemailer');
require('dotenv').config();

const { sequelize, testConnection } = require('./config/database');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Khởi tạo mail transporter
const mailTransporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

// Thêm mailTransporter vào app để sử dụng ở các routes
app.locals.mailTransporter = mailTransporter;

// Basic middleware
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Security middleware
app.use(helmet());
app.use(cors());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    status: 'error',
    message: 'Quá nhiều request từ IP này, vui lòng thử lại sau 15 phút'
  }
});
app.use('/api/', limiter);

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Nén response
app.use(compression());

// Routes
app.use('/api/auth', authRoutes);

// Admin route middleware
const adminAuth = async (req, res, next) => {
  const { email, password } = req.body;
  
  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    next();
  } else {
    res.status(401).json({
      status: 'error',
      message: 'Không có quyền truy cập'
    });
  }
};

// Admin routes
app.post('/api/admin/login', adminAuth, (req, res) => {
  res.json({
    status: 'success',
    message: 'Đăng nhập admin thành công'
  });
});

// Email test route (chỉ trong môi trường development)
if (process.env.NODE_ENV === 'development') {
  app.post('/api/test/email', async (req, res) => {
    try {
      await mailTransporter.sendMail({
        from: process.env.MAIL_USER,
        to: req.body.to,
        subject: 'Test Email',
        text: 'This is a test email'
      });
      
      res.json({
        status: 'success',
        message: 'Email gửi thành công'
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Không thể gửi email',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  });
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server đang hoạt động',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// Handle undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Không tìm thấy đường dẫn: ${req.originalUrl}`
  });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', err);
  }

  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      status: 'error',
      message: err.errors.map(e => e.message)
    });
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({
      status: 'error',
      message: 'Dữ liệu đã tồn tại'
    });
  }

  res.status(err.statusCode).json({
    status: err.status,
    message: process.env.NODE_ENV === 'production' 
      ? 'Có lỗi xảy ra, vui lòng thử lại sau'
      : err.message
  });
});

// Khởi động server
const startServer = async () => {
  try {
    // Test kết nối database
    await testConnection();
    
    // Test kết nối email
    if (process.env.NODE_ENV === 'development') {
      try {
        await mailTransporter.verify();
        console.log('Kết nối email server thành công');
      } catch (error) {
        console.warn('Cảnh báo: Không thể kết nối đến email server:', error.message);
      }
    }
    
    // Khởi động server
    const server = app.listen(process.env.PORT, () => {
      console.log(`
        Server đang chạy:
        - Port: ${process.env.PORT}
        - Environment: ${process.env.NODE_ENV}
        - Email configured: ${!!process.env.MAIL_HOST}
        - Admin email: ${process.env.ADMIN_EMAIL}
      `);
    });

    // Xử lý unhandled rejections
    process.on('unhandledRejection', (err) => {
      console.error('UNHANDLED REJECTION! Đang tắt server...');
      console.error(err);
      server.close(() => {
        process.exit(1);
      });
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
      console.log('SIGTERM RECEIVED. Đang tắt server...');
      server.close(async () => {
        await sequelize.close();
        console.log('Server đã đóng');
        process.exit(0);
      });
    });

  } catch (error) {
    console.error('Lỗi khởi động server:', error);
    process.exit(1);
  }
};

// Xử lý uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION! Đang tắt server...');
  console.error(err);
  process.exit(1);
});

startServer();

module.exports = app;