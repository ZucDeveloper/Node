'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/product-controller')
const authService = require('../services/authService');

// Buscar todos os itens
router.get('/', controller.get)
// Busca no Banco por ID
router.get('/admin/:id', controller.getById);
// Buscar items pelo Slug
router.get('/:slug', controller.getBySlug)
// Busca produtos por tag
router.get('/tags/:tag', controller.getByTag)
// Grava no banco de dados
router.post('/', authService.isAdmin, controller.post);
// Altera 
router.put('/:id', authService.isAdmin, controller.put);
// Deleta
router.delete('/:id', authService.isAdmin, controller.delete);
module.exports = router;