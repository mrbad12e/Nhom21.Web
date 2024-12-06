const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const attachedRoutes = require('./routes/index');
const errorHandler = require('./middleware/error.middleware');

const app = express();

// Middleware để parse dữ liệu JSON trong request body (tích hợp sẵn trong express)
app.use(bodyParser.json());
app.use(cookieParser());

app.use(cookieParser());
// Middleware để parse dữ liệu JSON trong request body
app.use('/', attachedRoutes);
app.use(errorHandler);

const port = process.env.PORT || 3000;
// Khởi động server
app.listen(port, function (err) {
    if (err) console.log('Error in server setup');
    console.log('Server listening on Port', port);
});
