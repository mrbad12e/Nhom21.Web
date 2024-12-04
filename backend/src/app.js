const express = require('express');
const bodyParser = require('body-parser'); 
const userRoutes = require('../src/routes/client/user.routes');
const productRoutes = require('../src/routes/client/product.routes');
const cartRoutes = require('../src/routes/client/cart.routes');
const orderRoutes = require('../src/routes/client/order.routes');
const reviewRoutes = require('../src/routes/client/review.routes'); 
const app = express();

// Middleware để parse dữ liệu JSON trong request body (tích hợp sẵn trong express)
app.use(express.json());  

// Đăng ký các routes
app.use('/auth', userRoutes);  // Route đăng nhập/đăng ký
app.use('/api/cart', cartRoutes);  // Route giỏ hàng
app.use('/api/products', productRoutes);  // Route sản phẩm
app.use('/api/orders', orderRoutes);  // Route đơn hàng
app.use('/api/reviews', reviewRoutes);  // Route  review

// Khởi động server
const port = process.env.PORT || 3000; 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
