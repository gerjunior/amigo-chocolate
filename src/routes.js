const { Router } = require('express')
const auth = require('./middleware/auth')

const GrupoController = require('./controllers/GrupoController')
const PessoaController = require('./controllers/PessoaController')
const LoginController = require('./controllers/LoginController')

const routes = Router()

routes.get('/token', LoginController.geraToken)

routes.get('/grupo', GrupoController.index)
routes.post('/grupo', GrupoController.create)
routes.put('/grupo', GrupoController.edit)
routes.get('/grupo/:_id', GrupoController.getOne)
routes.delete('/grupo/:_id', GrupoController.delete)
routes.post('/grupo/add/:_idGroup/:Nick', GrupoController.addNewMember)
routes.post('/grupo/remove/:_idGroup/:Nick', GrupoController.removeMember)
routes.post('/grupo/draw/:_idGroup', GrupoController.draw)

routes.get('/pessoa', auth, PessoaController.index)
routes.post('/pessoa', PessoaController.create)
routes.put('/pessoa', PessoaController.edit)
routes.get('/pessoa/:Nick', PessoaController.getOne)
routes.delete('/pessoa/:Nick', PessoaController.delete)
routes.post('/pessoa/add/:MyNick/:FriendNick', PessoaController.addNewFriend)
routes.post('/pessoa/remove/:MyNick/:FriendNick', PessoaController.removeFriend)

module.exports = routes