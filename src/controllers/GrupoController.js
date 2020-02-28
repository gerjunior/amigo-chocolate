const Grupo = require('../models/Grupo')
const Pessoa = require('../models/Pessoa')
const {
    generic,
    validationError,
    alreadyGroupMember,
    missingInformations,
    userNotFound,
    groupNotFound,
    nickNotFound
} = require('../utils/error')

module.exports = {
    index(request, response) {

        Grupo.find(request.body, (err, res) => {

            if (!res || res.length === 0) {
                return response.status(404).json(res)
            }

            if (err) {
                return response.status(500).json({ ...generic, _message: err.message })
            }

            return response.send(res)
        })
    },

    getOne(request, response) {
        let { _id } = request.params

        Grupo.findById(_id, (err, res) => {
            if (err || !res) {
                return response.status(404).json({})
            }

            return response.json(res)
        })
    },

    async create(request, response) {
        let { admin } = request.body

        //Status do Grupo (A - Aguardando, S - Sorteado, F - Finalizado)
        let statusGrupo = 'A'

        if (!admin || !admin.apelido) {
            return response.status(400).json({ ...missingInformations, admin: { apelido: "apelido" } })
        }

        let apelido = admin.apelido
        admin = await Pessoa.findOne({ apelido: admin.apelido })

        if (!admin) {
            return response.status(404).json({ ...nickNotFound, apelido: apelido })
        }

        let grupo = { ...request.body, admin, integrantes: admin }
        Grupo.create(grupo, (err, res) => {
            if (err) {
                return response.status(400).json({ ...validationError, _message: err.message })
            }

            return response.send(res)
        })
    },

    edit(request, response) {
        let { _id } = request.body

        if (!_id) {
            return response.status(400).json({ ...missingInformations, _id: "ID" })
        }

        Grupo.findByIdAndUpdate(_id, request.body, { new: true }, (err, res) => {
            if (err) {
                return response.status(400).json({ ...generic, _message: err.message })
            }
            else if (!res) {
                return response.status(404).json({ ...userNotFound, _id: _id })
            }

            return response.send(res)
        })
    },

    delete(request, response) {
        let { _id } = request.params

        Grupo.findByIdAndDelete(_id, (err, res) => {
            if (err) {
                return response.status(400).json({ ...missingInformations, _id: "ID", _message: err.message })
            }

            if (!res) {
                return response.status(404).json({})
            }

            response.send()
        })
    },

    async addNewMember(request, response) {
        let { _idGroup, Nick, } = request.params

        const member = await Pessoa.findOne({ apelido: Nick })

        if (!member) {
            return response.status(404).json({ ...nickNotFound, Nick: Nick })
        }

        const isAlreadyMember = await Grupo.findOne({ _id: _idGroup, integrantes: { "$elemMatch": { "apelido": Nick } } })

        if (!isAlreadyMember || isAlreadyMember.length === 0) {
            Grupo.findByIdAndUpdate(_idGroup, { "$push": { "integrantes": member } }, { new: true }, async (err, res) => {

                if (err) {
                    return response.status(400).json({ ...generic, _message: err.message })
                }

                if (!res) {
                    return response.status(404).json({ ...groupNotFound, _id: _idGroup })
                }

                await Pessoa.findByIdAndUpdate(member._id, { "$push": { "grupos": res } })

                return response.send(res)
            })
        }
        else {
            return response.status(400).json({ ...alreadyGroupMember, _id: _idGroup })
        }
    },

    adminDeleteAll(request, response) {

        Grupo.deleteMany({}, (err, res) => {
            return response.send('Worked!')
        })
    }
}