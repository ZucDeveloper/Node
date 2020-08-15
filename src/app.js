const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

// Carrega as Rotas
const indexRoute = require('./routes/index-route');
const productsRoute = require('./routes/product-route');

// Midleware para transformar JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// direciona as Rotas
app.use('/', indexRoute);
app.use('/products', productsRoute);
module.exports = app;