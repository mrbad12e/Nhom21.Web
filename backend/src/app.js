const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const authRoutes = require('./src/routes/authRoutes');

app.use(bodyParser.json()); // Middleware để parse JSON
app.use('/auth', authRoutes); // Đăng ký các route cho đăng nhập

