'use estrict';
const mongoose = require('mongoose');
const ValidationContract = require('../validators/fluentValidator');
const Product = mongoose.model('Product');
const repository = require('../repositories/productsRepository')

// Busca os item do banco de dados
exports.get = (req, res, next) => {
  repository
    .get()
    // resultado
    .then(data => {
      res.status(200).send(data);
    }).catch(e => {
      res.status(400).send(e);
    });
}
// Busca no banco de dados por Slug no final da url
exports.getBySlug = (req, res, next) => {
  repository
    .getBySlug(req.params.slug)
    // resultado
    .then(data => {
      res.status(200).send(data);
    }).catch(e => {
      res.status(400).send(e);
    });
}
// Busca pelo ID do produto na URL
exports.getById = (req, res, next) => {
  repository
    .getById(req.params.id)
    // resultado
    .then(data => {
      res.status(200).send(data);
    }).catch(e => {
      res.status(400).send(e);
    });
}
// Busca por Tag dos produtos
exports.getByTag = (req, res, next) => {
  repository
    .getByTag(req.params.tags)
    // resultado
    .then(data => {
      res.status(200).send(data);
    }).catch(e => {
      res.status(400).send(e);
    });
}
// Posta os itens no banco de dados
exports.post = (req, res, next) => {
  let contract = new ValidationContract();
  contract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres')
  contract.hasMinLen(req.body.slug, 3, 'O slug deve conter pelo menos 3 caracteres')
  contract.hasMinLen(req.body.description, 3, 'A description deve conter pelo menos 3 caracteres')

  // Se os dados forem invalidos
  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end();
    return;
  }

  repository
    .create(req.body)
    .then(x => {
      res.status(201).send({ message: 'Produto cadastrado com sucesso!' });
    }).catch(e => {
      res.status(400).send({
        message: 'Falha ao cadastrar o produto!',
        data: e
      });
    });

};
// Atualizar um produto
exports.put = (req, res, next) => {
  repository
    .upDate(req.params.id, req.body)
    .then(x => {
      res.status(201).send({
        message: 'Produto atualizado com sucesso!'
      });
    }).catch(e => {
      res.status(400).send({
        message: 'Falha ao atualizar produto',
        data: e
      });
    });
};
exports.delete = (req, res, next) => {
  repository
    .delete(req.body.id)
    .then(x => {
      res.status(200).send({
        message: 'Produto removido com sucesso!'
      });
    }).catch(e => {
      res.status(400).send({
        message: 'Falha ao remover produto',
        data: e
      });
    });
};