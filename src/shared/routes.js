const { Router } = require('express');

const routes = Router();

const tokenRoutes = require('../modules/login/routes/token.routes');
const grupoRoutes = require('../modules/grupo/routes/grupo.routes');
const pessoaRoutes = require('../modules/pessoa/routes/pessoa.routes');

routes.use(tokenRoutes);
routes.use(grupoRoutes);
routes.use(pessoaRoutes);

module.exports = routes;
