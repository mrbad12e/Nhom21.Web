const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/client/user.routes');
const productRoutes = require('./routes/client/product.routes');
const cartRoutes = require('./routes/client/cart.routes');
const orderRoutes = require('./routes/OrderRoutes');
const app = express();

// Middleware để parse dữ liệu JSON trong request body
app.use(bodyParser.json());
app.use('/auth', userRoutes);
app.use('/api/cart', cartRoutes);

// Dùng các routes cho yêu cầu đến /api/products
app.use('/api/products', productRoutes);

app.use('/api/orders', orderRoutes);
// Khởi động server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
