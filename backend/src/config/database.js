const { Sequelize } = require('sequelize');
require('dotenv').config();

// Database connection configuration
const {
  DB_HOST = 'pg-27acab61-ntnghia9a7-4e14.h.aivencloud.com',
  DB_PORT = 24259,
  DB_NAME = 'store',
  DB_USER = 'avnadmin',
  DB_PASSWORD = 'AVNS_lHjfoRsc9cYDtvcka-5',
  NODE_ENV = 'development'
} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: Number(DB_PORT),
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Chỉ dùng cho development, kiểm tra xem có chấp nhận được SSL hay không
    },
  },
  logging: NODE_ENV === 'development' ? console.log : false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },  
  // Cấu hình kết nối PostgreSQL
  dialectOptions: {
    ssl: NODE_ENV === 'production' ? {
      require: true,
      rejectUnauthorized: false // Cảnh báo: Chỉ dùng trong môi trường development
    } : false,
    statement_timeout: 20000, // Timeout truy vấn
    idle_in_transaction_session_timeout: 20000 // Timeout transaction
  },
  
  // Cấu hình model
  define: {
    timestamps: true,     // Tự động thêm createdAt, updatedAt
    underscored: true,    // Sử dụng snake_case
    freezeTableName: true // Giữ nguyên tên bảng
  }
});

// Kiểm tra kết nối database
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Kết nối database thành công');
    
    // Sync database chỉ trong môi trường development
    if (NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
      console.log('🔄 Đã đồng bộ cấu trúc database');
    }
  } catch (error) {
    console.error('❌ Lỗi kết nối database:', error);
    process.exit(1);
  }
};

module.exports = {
  sequelize,
  testConnection
};