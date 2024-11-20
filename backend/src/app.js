const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const cors = require('cors');
const errorHandlers = require('./middleware/error.middleware');
require('dotenv').config;
const app = express();

app.use(cors());
// Middleware để parse dữ liệu JSON trong request body

const PORT = process.env.PORT || 3000

app.use(bodyParser.json());
app.use('/api', routes);


//Middleware for handle unidentified route/api
app.use(errorHandlers.notFoundHandler);


app.use(errorHandlers.errorHandler);
//Middleware for error handling

app.listen(PORT,() => {
  console.log(`Server is running on ${PORT}`);
})


module.exports = app;

