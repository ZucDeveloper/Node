'use estrict';

// const ValidationContract = require('../validators/fluentValidator');
const repository = require('../repositories/ordersRepository')
const guid = require('guid');

// Busca os item do banco de dados
exports.get = async (req, res, next) => {
  try {
    var data = await repository.get();
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar sua requisição'
    });
  };
};

exports.post = async (req, res, next) => {
  try {
    await repository.create({
      customer: req.body.customer,
      number: guid.raw().substring(0, 6),
      items: req.body.items
    });
    res.status(201).send({ message: 'Pedido cadastrado com sucesso!' });
  } catch (e) {
    res.status(400).send({
      message: 'Falha ao processar sua requisição'
    });
  };
};