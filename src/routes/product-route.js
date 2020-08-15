'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/product-controller')

// Buscar items
router.get('/', controller.get)
// Buscar items
router.get('/:slug', controller.getBySlug)
// Postagem
router.post('/', controller.post);
// Alteração
router.put('/:id', controller.put);
// Deletar post
router.delete('/', controller.delete);
module.exports = router;