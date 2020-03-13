const { Router } = require('express')

const GrupoController = require('./controllers/GrupoController')
const PessoaController = require('./controllers/PessoaController')
const LoginController = require('./controllers/LoginController')

const auth = require('./middleware/auth')
const { validate } = require('./middleware/validator')
const { GrupoValidationRules } = require('./validations/GrupoValidations')
const { PessoaValidationRules } = require('./validations/PessoaValidations')

const routes = Router()

//---------------------ROTAS--------------------

routes.post('/token', LoginController.geraToken)

routes.get('/grupo', auth, GrupoController.index)
routes.post('/grupo', GrupoValidationRules(), validate, GrupoController.create)
routes.put('/grupo', GrupoValidationRules(), validate, GrupoController.edit)
routes.get('/grupo/:_id', GrupoController.getOne)
routes.delete('/grupo/:_id', GrupoController.delete)
routes.post('/grupo/add/:_idGroup/:Nick', GrupoController.addNewMember)
routes.post('/grupo/remove/:_idGroup/:Nick', GrupoController.removeMember)
routes.post('/grupo/draw/:_idGroup', GrupoController.draw)

routes.get('/pessoa', PessoaController.index, auth)
routes.post('/pessoa', PessoaValidationRules(), validate, PessoaController.create)
routes.put('/pessoa', PessoaValidationRules(), validate, PessoaController.edit)
routes.get('/pessoa/:Nick', PessoaController.getOne)
routes.delete('/pessoa/:Nick', PessoaController.delete)
routes.post('/pessoa/add/:MyNick/:FriendNick', PessoaController.addNewFriend)
routes.post('/pessoa/remove/:MyNick/:FriendNick', PessoaController.removeFriend)

module.exports = routes