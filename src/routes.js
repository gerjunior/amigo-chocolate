const { Router } = require('express')

const GrupoController = require('./controllers/GrupoController')
const PessoaController = require('./controllers/PessoaController')

const routes = Router()

routes.get('/grupo', GrupoController.index)
routes.post('/grupo', GrupoController.create)
routes.put('/grupo', GrupoController.edit)
routes.get('/grupo/:_id', GrupoController.getOne)
routes.delete('/grupo/:_id', GrupoController.delete)
routes.get('/grupo/findMember/:_id', GrupoController.findMember)

routes.get('/pessoa', PessoaController.index)
routes.post('/pessoa', PessoaController.create)
routes.put('/pessoa', PessoaController.edit)
routes.get('/pessoa/:_id', PessoaController.getOne)
routes.delete('/pessoa/:_id', PessoaController.delete)

module.exports = routes