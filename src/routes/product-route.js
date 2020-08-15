'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/product-controller')

// Buscar todos os itens
router.get('/', controller.get)
// Busca no Banco po ID
router.get('/admin/:id', controller.getById);
// Buscar items pelo Slug
router.get('/:slug', controller.getBySlug)
// Grava no banco de dados
router.post('/', controller.post);
// Altera 
router.put('/:id', controller.put);
// Deleta
router.delete('/', controller.delete);
module.exports = router;