'use estrict';

// const ValidationContract = require('../validators/fluentValidator');
const repository = require('../repositories/ordersRepository')
const guid = require('guid');
const authService = require('../services/authService');

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
    // Recupera o Token
    const token = req.body.token || req.query.token || req.headers['x-access-'];
    const data = await authService.decodeToken(token);

    await repository.create({
      customer: data.id,
      number: guid.raw().substring(0, 6),
      items: req.body.items
    });
    res.status(201).send({ message: 'Pedido cadastrado com sucesso!' });
  } catch (e) {
    console.log(e)
    res.status(400).send({
      message: 'Falha ao processar sua requisição'
    });
  };
};