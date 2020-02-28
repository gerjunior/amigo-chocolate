const { Router } = require('express')

const GrupoController = require('./controllers/GrupoController')
const PessoaController = require('./controllers/PessoaController')

const routes = Router()

routes.get('/grupo', GrupoController.index)
routes.post('/grupo', GrupoController.create)
routes.put('/grupo', GrupoController.edit)
routes.get('/grupo/:_id', GrupoController.getOne)
routes.delete('/grupo/:_id', GrupoController.delete)
routes.post('/grupo/add/:_idGroup/:Nick', GrupoController.addNewMember)
routes.delete('/grupo/admin/delete', GrupoController.adminDeleteAll)

routes.get('/pessoa', PessoaController.index)
routes.post('/pessoa', PessoaController.create)
routes.put('/pessoa', PessoaController.edit)
routes.get('/pessoa/:Nick', PessoaController.getOne)
routes.delete('/pessoa/:Nick', PessoaController.delete)
routes.post('/pessoa/add/:MyNick/:FriendNick', PessoaController.addNewFriend)
routes.post('/pessoa/remove/:MyNick/:FriendNick', PessoaController.removeFriend)
routes.delete('/pessoa/admin/delete', PessoaController.adminDeleteAll)

module.exports = routes