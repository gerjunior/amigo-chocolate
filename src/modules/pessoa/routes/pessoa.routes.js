const { Router } = require('express');

const PessoaController = require('../controllers/PessoaController');

const auth = require('../../../shared/middleware/auth');
const { validate } = require('../../../shared/middleware/validator');
const { PessoaValidationRules } = require('../validations/PessoaValidations');

const routes = Router();

routes.get('/pessoa', auth, PessoaController.index);
routes.post('/pessoa', auth, PessoaValidationRules(), validate, PessoaController.create);
routes.put('/pessoa', auth, PessoaValidationRules(), validate, PessoaController.edit);
routes.get('/pessoa/:Nick', auth, PessoaController.getOne);
routes.delete('/pessoa/:Nick', auth, PessoaController.delete);
routes.post('/pessoa/add/:MyNick/:FriendNick', auth, PessoaController.addNewFriend);
routes.post('/pessoa/remove/:MyNick/:FriendNick', auth, PessoaController.removeFriend);

module.exports = routes;
