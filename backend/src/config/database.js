// config/database.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

// Lấy thông tin kết nối từ biến môi trường hoặc sử dụng giá trị mặc định
const {
  DB_HOST = 'localhost',
  DB_PORT = 5000,
  DB_NAME = 'auth_demo',
  DB_USER = 'postgres',
  DB_PASSWORD = 'your_password',
  NODE_ENV = 'development'
} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'postgres',
  
  // Cấu hình logging
  logging: NODE_ENV === 'development' ? console.log : false,
  
  // Cấu hình pool connection
  pool: {
    max: 5, // Số lượng connection tối đa trong pool
    min: 0, // Số lượng connection tối thiểu trong pool
    acquire: 30000, // Thời gian tối đa để lấy connection từ pool (ms)
    idle: 10000 // Thời gian tối đa một connection được phép idle (ms)
  },
  
  // Cấu hình PostgreSQL
  dialectOptions: {
    ssl: NODE_ENV === 'production' ? {
      require: true,
      rejectUnauthorized: false
    } : false,
    timezone: 'local', // Sử dụng timezone local
    statement_timeout: 180000, // Timeout cho mỗi query (ms)
    idle_in_transaction_session_timeout: 180000 // Timeout cho transaction (ms)
  },
  
  // Cấu hình timezone
  timezone: '+07:00', // Timezone Việt Nam
  
  // Cấu hình model
  define: {
    timestamps: true, // Tự động thêm createdAt và updatedAt
    underscored: true, // Sử dụng snake_case thay vì camelCase cho tên cột
    freezeTableName: false, // Cho phép Sequelize thêm 's' vào tên bảng
    charset: 'utf8',
    collate: 'utf8_general_ci'
  }
});

// Kiểm tra kết nối
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Kết nối database thành công.');
    
    // Sync database trong môi trường development
    if (NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
      console.log('Database đã được sync.');
    }
  } catch (error) {
    console.error('Không thể kết nối đến database:', error);
    process.exit(1); // Thoát process nếu không kết nối được database
  }
};

// Export cả instance và hàm test
module.exports = {
  sequelize,
  testConnection
};

// Xử lý các sự kiện của connection
sequelize.addHook('beforeConnect', async (config) => {
  console.log('Đang kết nối đến database...');
});

sequelize.addHook('afterConnect', async (connection) => {
  console.log('Đã kết nối đến database thành công.');
});

// Xử lý đóng kết nối khi process kết thúc
process.on('SIGINT', async () => {
  try {
    await sequelize.close();
    console.log('Đã đóng kết nối database.');
    process.exit(0);
  } catch (error) {
    console.error('Lỗi khi đóng kết nối database:', error);
    process.exit(1);
  }
});