const express = require('express');
const bodyParser = require('body-parser'); 
const userRoutes = require('./routes/client/user.routes');
const productRoutes = require('./routes/client/product.routes');
const cartRoutes = require('./routes/client/cart.routes');
const orderRoutes = require('./routes/OrderRoutes');
const reviewRoutes = require('./routes/reviewRoutes'); 
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
