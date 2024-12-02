const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/client/user.routes');
const productRoutes = require('./routes/client/product.routes');
const cartRoutes = require('./routes/client/cart.routes');
const orderRoutes = require('./routes/OrderRoutes');
const reviewRoutes = require('./routes/reviewRoutes'); 
const app = express();

app.use(cookieParser());

// Middleware để parse dữ liệu JSON trong request body
app.use(bodyParser.json());
app.use('/auth', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/cart', cartRoutes);


// Khởi động server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
