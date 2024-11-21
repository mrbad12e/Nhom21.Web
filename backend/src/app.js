const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/admin/auth.routes');

const app = express();

// Middleware để parse dữ liệu JSON trong request body
app.use(bodyParser.json());
app.use('/auth', authRoutes);


