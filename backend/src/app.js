const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/index');
const errorHandler = require('./middleware/error.middleware');

const userRoutes = require('./routes/client/user.routes');
const productRoutes = require('./routes/client/product.routes');
const cartRoutes = require('./routes/client/cart.routes');
const orderRoutes = require('./routes/client/order.routes');
const app = express();

// Middleware để parse dữ liệu JSON trong request body (tích hợp sẵn trong express)
app.use(bodyParser.json());
app.use(cookieParser());

app.use(cookieParser());
// Middleware để parse dữ liệu JSON trong request body
app.use('/', authRoutes);
app.use(errorHandler);

const port = process.env.PORT || 3000;
// Khởi động server
app.listen(port, function (err) {
    if (err) console.log('Error in server setup');
    console.log('Server listening on Port', port);
});
