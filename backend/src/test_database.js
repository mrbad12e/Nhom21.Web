// test-database.js
const { sequelize, testConnection } = require('./config/database');

async function runDatabaseTest() {
  try {
    // Kiểm tra kết nối
    await testConnection();

    // Thử truy vấn đơn giản
    const [results] = await sequelize.query('SELECT NOW()');
    console.log('Thời gian hiện tại từ database:', results);

    // Kiểm tra thông tin kết nối
    console.log('Thông tin kết nối:');
    console.log('Host:', sequelize.config.host);
    console.log('Port:', sequelize.config.port);
    console.log('Database:', sequelize.config.database);

  } catch (error) {
    console.error('Lỗi kiểm tra database:', error);
  } finally {
    // Đóng kết nối
    await sequelize.close();
  }
}

runDatabaseTest();