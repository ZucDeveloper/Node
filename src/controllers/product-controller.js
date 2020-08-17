'use estrict';

const ValidationContract = require('../validators/fluentValidator');
const repository = require('../repositories/productsRepository')
const guid = require('guid');
const upClound = require('../services/upClound')


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
// Busca no banco de dados por Slug no final da url
exports.getBySlug = async (req, res, next) => {
  try {
    var data = await repository.getBySlug(req.params.slug);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar sua requisição'
    });
  };
};
// Busca pelo ID do produto na URL
exports.getById = async (req, res, next) => {
  try {
    var data = await repository.getById(req.params.id);
    res.status(200).send(data);
  } catch (e) {
    res.status(400).send({
      message: 'Falha ao processar sua requisição'
    });
  };
};
// Busca por Tag dos produtos
exports.getByTag = async (req, res, next) => {
  try {
    console.log(req.params.tags)
    var data = await repository.getByTag(req.params.tag);
    res.status(200).send(data);
  } catch (e) {
    res.status(400).send({
      message: 'Falha ao processar sua requisição'
    });
  };
};
// Posta os itens no banco de dados
exports.post = async (req, res, next) => {

  let contract = new ValidationContract();
  contract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres')
  contract.hasMinLen(req.body.slug, 3, 'O slug deve conter pelo menos 3 caracteres')
  contract.hasMinLen(req.body.description, 3, 'A description deve conter pelo menos 3 caracteres')

  // Se os dados forem invalidos
  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end();
    return;
  }

  try {    
    let fileName = guid.raw().toString();
    var dataURI = req.body.image;
    //  enviando foto para o Cloundnary
    await upClound.upProduct(dataURI, fileName, 'storage');    
    await repository.create({
      title: req.body.title,
      slug: req.body.slug,
      description: req.body.description,
      price: req.body.price,
      active: true,
      tags: req.body.tags,
      image: `http://res.cloudinary.com/zucdeveloper/image/upload/v1597637875/storage/${fileName}.jpg` 
    });
    res.status(201).send({ message: 'Produto cadastrado com sucesso!' });
  } catch (e) {
    console.log(e)
    res.status(400).send({
      message: 'Falha ao processar sua requisição'
    });
  };
};
// Atualizar um produto
exports.put = async (req, res, next) => {
  try {
    await repository.upDate(req.params.id, req.body);
    res.status(201).send({
      message: 'Produto atualizado com sucesso!'
    });
  } catch (e) {
    res.status(400).send({
      message: 'Falha ao processar sua requisição'
    });
  };
};
exports.delete = async (req, res, next) => {
  try{
    await repository.delete(req.body.id ? req.body.id : error());
    res.status(200).send({
      message: 'Produto removido com sucesso!'
    });
  } catch (e) {
    res.status(400).send({
      message: 'Falha ao processar sua requisição'
    });
  };
};

// Função de retorno de error caso o ID nao seja informado no bady na função delete acima
const error = () => {
  res.status(400).send({
    message: 'Falha ao processar sua requisição'
  });
};
