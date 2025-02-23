const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config')


const app = express();
const router = express.Router();

// Conecta com o banco de dados
mongoose.set('useCreateIndex', true);
mongoose.connect (config.connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


// Carrega os Models
const Product = require('./models/product');
const Customer = require('./models/customer')
const Order = require('./models/order')

// Carrega as Rotas
const indexRoute = require('./routes/index-route');
const productsRoute = require('./routes/product-route');
const customerRoute = require('./routes/customer-route');
const orderRoute = require('./routes/order-route')

// Midleware para transformar JSON
app.use(bodyParser.json({
  limit: '5mb'
}));
app.use(bodyParser.urlencoded({ extended: false }));

// Habilita o CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers','Origin, x-Requested-with, Content-Type, Accept, x-accedd-token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
})


// direciona as Rotas
app.use('/', indexRoute);
app.use('/products', productsRoute);
app.use('/customers', customerRoute);
app.use('/orders', orderRoute)
module.exports = app;













