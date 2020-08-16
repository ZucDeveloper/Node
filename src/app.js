const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config')


const app = express();
const router = express.Router();

// Conecta com o banco de dados
mongoose.connect (config.connectionString);

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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// direciona as Rotas
app.use('/', indexRoute);
app.use('/products', productsRoute);
app.use('/customers', customerRoute);
app.use('/orders', orderRoute)
module.exports = app;













