'use estrict';

const ValidationContract = require('../validators/fluentValidator');
const customers = require('../repositories/customersRepository')

// Posta os itens no banco de dados
exports.post = async (req, res, next) => {

  let contract = new ValidationContract();
  contract.hasMinLen(req.body.name, 2, 'O nome deve conter pelo menos 2 caracteres')
  contract.isEmail(req.body.email, 'E-mail inválido')
  contract.hasMinLen(req.body.password, 6, 'A senha deve conter pelo menos 6 caracteres')

  // Se os dados forem invalidos
  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end();
    return;
  }

  try {
    await customers.create(req.body);
    res.status(201).send({ message: 'Cliente cadastrado com sucesso!' });
  } catch (e) {
    res.status(400).send({
      message: 'Falha ao processar sua requisição'
    });
  };
};