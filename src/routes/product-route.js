'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/product-controller')

// Buscar todos os itens
router.get('/', controller.get)
// Busca no Banco por ID
router.get('/admin/:id', controller.getById);
// Buscar items pelo Slug
router.get('/:slug', controller.getBySlug)
// Busca produtos por tag
router.get('/tags/:tag', controller.getByTag)
// Grava no banco de dados
router.post('/', controller.post);
// Altera 
router.put('/:id', controller.put);
// Deleta
router.delete('/:id', controller.delete);
module.exports = router;