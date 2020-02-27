const Grupo = require('../models/Grupo')
const Pessoa = require('../models/Pessoa')
const ObjectID = require('mongoose').Types.ObjectId
const {
    generic,
    noInformation,
    notFound,
    validationError,
    idNotFound } = require('../utils/error')

module.exports = {
    index(request, response) {

        Grupo.find(request.body, (err, res) => {

            if (!res || res.length === 0) {
                return response.status(404).json({ ...noInformation })
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
                return response.status(404).json({ ...notFound, _id: _id })
            }

            return response.json(res)
        })
    },

    async create(request, response) {
        let {admin, nome, valorMinimo, valorMaximo, dataSorteio } = request.body

        //Status do Grupo (A - Aguardando, S - Sorteado, F - Finalizado)
        let statusGrupo = 'A'

        if (!admin || !admin._id){
            return response.status(400).json({ ...idNotFound, admin: {_id: "ID"}})
        }

        if (!ObjectID.isValid(admin._id)){
            return response.status(400).json({...validationError, _message: "admin _id inválido."})
        }

        admin = await Pessoa.findById(admin._id)

        if (!admin){
            return response.status(404).json({...notFound, _id: admin._id})
        }

        let grupo = {nome, admin, valorMinimo, valorMaximo, dataSorteio, statusGrupo}

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
            return response.status(400).json({ ...idNotFound })
        }

        Grupo.findByIdAndUpdate(_id, request.body, { new: true }, (err, res) => {
            if (err) {
                return response.status(400).json({ ...generic, _message: err.message })
            }
            else if (!res) {
                return response.status(404).json({ ...notFound, _id: _id })
            }

            return response.send(res)
        })
    },

    delete(request, response) {
        let { _id } = request.params

        Grupo.findByIdAndDelete(_id, (err, res) => {
            if (err) {
                return response.status(400).json({ ...invalidInformations, _message: err.message })
            }

            if (!res) {
                return response.status(404).json({ ...notFound, _id: _id })
            }

            response.send()
        })
    },

    async addNewMember(request, response) {
        //TODO: Verificar se já está presente no grupo.
        //TODO: Adicionar uma lista de Grupos em PESSOA.
        let {  _idGroup, _idMember, } = request.params

        const member = await Pessoa.findById(_idMember)

        Grupo.findByIdAndUpdate(_idGroup, { "$push": { "integrantes": member } }, { new: true }, (err, res) => {
            if (err){
                return response.status(400).json({...generic, _message: err.message})
            }

            return response.send(res)
        })
    }
}