'use estrict';

const ValidationContract = require('../validators/fluentValidator');
const repository = require('../repositories/customersRepository');
const md5 = require('md5');
const msg = require('../services/emailService');
const authService = require('../services/authService');
// import { send } from '../services/emailService';
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
		await repository.create({
			name: req.body.name,
			email: req.body.email,
			password: md5(req.body.password + global.SALT_KEY)
		});
		const nomeUser = '{0}';
		msg.send(
			req.body.email,
			'Bem vindo ao Node Store',
			global.EMAIL_TMPL.replace(nomeUser, req.body.name));

		res.status(201).send({ message: 'Cliente cadastrado com sucesso!' });
	} catch (e) {
		res.status(400).send({
			message: 'Falha ao processar sua requisição'
		});
	};
};

exports.authenticate = async (req, res, next) => {
	try {
		const customer = await repository.authenticate({
			email: req.body.email,
			password: md5(req.body.password + global.SALT_KEY)
		});

		if (!customer) {
			res.status(404).send({
				message: "Usuário ou senha inválidos"
			});
			return;
		}

		const token = await authService.generateToken({
			email: customer.email,
			name: customer.name
		})

		res.status(201).send({
			token: token,
			data: {
				email: customer.email,
				name: customer.name
			}
		});
	} catch (e) {
		res.status(400).send({
			message: 'Falha ao processar sua requisição'
		});
	};
};