const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/index');

const app = express();
app.use(cookieParser());
// Middleware để parse dữ liệu JSON trong request body
app.use(bodyParser.json());
app.use('/auth', authRoutes);


app.listen()