const express = require('express');
const routes = express.Router();

const UserController = require('../app/controllers/admin/UserController');

const UserValidator = require('../app/validators/user');

// Rotas que o administrador irá acessar para gerenciar usuários
routes.get('/', UserController.list) //Mostrar a lista de usuários cadastrados
routes.get('/create', UserController.registerForm); //Formulário de cadastro de usuário
routes.post('/', UserValidator.post, UserController.post); //Cadastrar um usuário
// routes.post('/', (req,res) => console.log(req.body)); //Cadastrar um usuário
// routes.put('/', UserController.put) // Editar um usuário
// routes.delete('/', UserController.delete) // Deletar um usuário

module.exports = routes;
