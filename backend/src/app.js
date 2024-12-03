const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/index');
const errorHandler = require('./middleware/error.middleware');
const app = express();
app.use(cookieParser());
// Middleware để parse dữ liệu JSON trong request body
app.use(bodyParser.json());
app.use('/', authRoutes);
app.use(errorHandler);
const port = process.env.PORT || 3000;
app.listen(port, function (err) {
  if (err) console.log('Error in server setup');
  console.log('Server listening on Port', port);
});
