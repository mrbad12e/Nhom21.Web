const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./src/routes/authRoutes');

const app = express();

// Middleware để parse dữ liệu JSON trong request body
app.use(bodyParser.json());
app.use('/auth', authRoutes);


