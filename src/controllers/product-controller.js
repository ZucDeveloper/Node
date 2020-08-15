'use estrict';
const mongoose = require('mongoose');
const Product = mongoose.model('Product');

// Busca os item do banco de dados
exports.get = (req, res, next) => {
  // .find Busca todos os produtos, no primeiro parametro trago apenas os produtos com o active true, e o segundo parametro indica os campos que voce quer trazer da database
  Product.find({ active: true }, 'title price slug')
  // resultado
  .then(data => {
    res.status(200).send(data);
  }).catch(e => {
    res.status(400).send(e);
  });
}
// Busca no banco de dados por Slug no final da url
exports.getBySlug = (req, res, next) => {
  // .find Busca todos os produtos, no primeiro parametro trago apenas os produtos com o active true, e trago todos os campos exceto o active.
  Product.findOne({ 
    slug: req.params.slug,
    active: true 
  }, 'title description price slug tags')
  // resultado
  .then(data => {
    res.status(200).send(data);
  }).catch(e => {
    res.status(400).send(e);
  });
}
// Busca pelo ID do produto na URL
exports.getById = (req, res, next) => {
  // .find Busca todos os produtos, no primeiro parametro trago apenas os produtos com o active true, e trago todos os campos exceto o active.
  Product.findById(req.params.id)
  // resultado
  .then(data => {
    res.status(200).send(data);
  }).catch(e => {
    res.status(400).send(e);
  });
}
// Busca por Tag dos produtos
exports.getByTag = (req, res, next) => {
 // .find Busca todos os produtos, no primeiro parametro trago apenas os produtos com o active true, e trago todos os campos exceto o active.
 Product.find({ 
   tags: req.params.tag,
   active: true
}, 'title description price slug tags')
 // resultado
 .then(data => {
   res.status(200).send(data);
 }).catch(e => {
   res.status(400).send(e);
 });
}
// Posta os itens no banco de dados
exports.post = (req, res, next) => {
  var product = new Product(req.body);
  product.save()
    .then(x => {
      res.status(201).send({ message: 'Produto cadastrado com sucesso!' });
    }).catch(e => {
      res.status(400).send({
        message: 'Falha ao cadastrar o produto!',
        data: e
      });
    });

};

exports.put = (req, res, next) => {
  let id = req.params.id;
  res.status(200).send({
    id: id,
    item: req.body
  });
};

exports.delete = (req, res, next) => {
  res.status(200).send(req.body);
};