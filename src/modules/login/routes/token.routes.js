const { Router } = require('express');

const LoginController = require('../controllers/LoginController');

const routes = Router();

routes.post('/token', LoginController.geraToken);

module.exports = routes;
