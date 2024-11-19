const { Pool } = require('pg');
const db = require('./config/database'); // Đường dẫn đến module bạn đã viết

const testConnection = async () => {
    try {
        // Thực hiện truy vấn đơn giản để kiểm tra kết nối
        const result = await db.pool.query('SELECT NOW() AS current_time');
        console.log('Database connection successful!');
        console.log('Current Time:', result.rows[0].current_time);
    } catch (error) {
        console.error('Database connection failed:', error.message);
    } finally {
        // Đóng pool nếu không cần sử dụng thêm
        await db.pool.end();
    }
};

// Gọi hàm kiểm tra kết nối
testConnection();
