const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const attachedRoutes = require('./routes/index');
const errorHandler = require('./middleware/error.middleware');

const app = express();

app.set('trust proxy', 1);

app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
// Middleware để parse dữ liệu JSON trong request body (tích hợp sẵn trong express)
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// Middleware để parse dữ liệu JSON trong request body
app.use('/', attachedRoutes);
app.use(errorHandler);


// Handle preflight requests
app.options('*', cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

const port = process.env.PORT || 3000;
// Khởi động server
app.listen(port, function (err) {
    if (err) console.log('Error in server setup');
    console.log('Server listening on Port', port);
});