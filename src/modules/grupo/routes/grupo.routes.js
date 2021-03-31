const { Router } = require('express');

const GrupoController = require('../controllers/GrupoController');
const { GrupoValidationRules } = require('../validations/GrupoValidations');
const auth = require('../../../shared/middleware/auth');
const { validate } = require('../../../shared/middleware/validator');

const routes = Router();

routes.get('/grupo', auth, GrupoController.index);
routes.post('/grupo', auth, GrupoValidationRules(), validate, GrupoController.create);
routes.put('/grupo', auth, GrupoValidationRules(), validate, GrupoController.edit);
routes.get('/grupo/:_id', auth, GrupoController.getOne);
routes.delete('/grupo/:_id', auth, GrupoController.delete);
routes.post('/grupo/add/:_idGroup/:Nick', auth, GrupoController.addNewMember);
routes.post('/grupo/remove/:_idGroup/:Nick', auth, GrupoController.removeMember);
routes.post('/grupo/draw/:_idGroup', auth, GrupoController.draw);

module.exports = routes;