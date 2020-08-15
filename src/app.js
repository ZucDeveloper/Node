const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');



const app = express();
const router = express.Router();

// Conecta com o banco de dados

mongoose.connect ("mongodb+srv://flamengo110493:flamengo110493@meudb.rifzw.mongodb.net/MeuDb?retryWrites=true&w=majority", {useNewUrlParser: true} );

// Carrega os Models
const product = require('./models/product');

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