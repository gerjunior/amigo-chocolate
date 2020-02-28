const Grupo = require('../models/Grupo')
const Pessoa = require('../models/Pessoa')
const {
    generic,
    validationError,
    alreadyGroupMember,
    missingInformations,
    userNotFound,
    groupNotFound,
    nickNotFound,
    notGroupMember,
    removeAdmin } = require('../utils/error')

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

        let grupo = { ...request.body, admin, statusGrupo, integrantes: admin }
        Grupo.create(grupo, async (err, res) => {
            if (err) {
                return response.status(400).json({ ...validationError, _message: err.message })
            }

            await Pessoa.findOneAndUpdate({apelido: apelido}, { "$push": { "grupos": res } })

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

        Grupo.findByIdAndDelete(_id, async (err, res) => {
            if (err) {
                return response.status(400).json({ ...missingInformations, _id: "ID", _message: err.message })
            }

            if (!res) {
                return response.status(404).json({})
            }

            await Pessoa.updateMany({}, { "$pull": { "grupos": { "_id": _id} } })

            response.send()
        })
    },

    async addNewMember(request, response) {
        let { _idGroup, Nick } = request.params

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

                await Pessoa.findOneAndUpdate({apelido: Nick}, { "$push": { "grupos": res } })

                return response.send(res)
            })
        }
        else {
            return response.status(400).json({ ...alreadyGroupMember, _id: _idGroup })
        }
    },

    async removeMember(request, response) {
        let { _idGroup, Nick } = request.params

        const member = await Pessoa.findOne({ apelido: Nick })

        if (!member) {
            return response.status(404).json({ ...nickNotFound, Nick: Nick })
        }

        const Group = await Grupo.findOne({ _id: _idGroup, integrantes: { "$elemMatch": { "apelido": Nick } } })

        if (!Group){
            return response.status(404).json({ ...notGroupMember, Nick: Nick })
        }

        if (Group.admin.apelido === member.apelido){
            return response.status(400).json({...removeAdmin})
        }
        

        Grupo.findOneAndUpdate({_id: _idGroup}, {"$pull": {integrantes: {apelido: Nick}}}, { new: true }, async (err, res) => {

            if (err){
                return response.send(500).json({...generic, _message: err.message})
            }
            
            await Pessoa.findOneAndUpdate({ apelido: Nick }, { "$pull": { "grupos": { "_id": _idGroup } } }, { new: true })

            return response.send(res)
        })
    }
}