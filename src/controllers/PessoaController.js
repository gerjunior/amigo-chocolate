const Pessoa = require('../models/Pessoa')
const {
    generic,
    notFound,
    noInformation,
    validationError,
    idNotFound,
    invalidInformations,
    addFriendError,
    friendAlreadyAdded } = require('../utils/error')

//TODO: Criar o método removeFriend
//TODO: Apagar da lista de amigos de todos em que ele estiver quando o usuário for apagado (método delete).

module.exports = {
    index(request, response) {

        Pessoa.find(request.body, (err, res) => {

            if (!res || res.length === 0) {
                return response.status(404).json({ ...noInformation })
            }

            if (err) {
                return response.status(500).json({ ...generic })
            }

            return response.send(res)
        })
    },

    getOne(request, response) {
        let { _id } = request.params
        Pessoa.findById(_id, (err, res) => {

            if (err || !res) {
                return response.status(404).json({
                    ...notFound,
                    _id: _id
                })
            }

            return response.json(res)
        })
    },

    create(request, response) {

        Pessoa.create(request.body, (err, res) => {
            if (err) {
                return response.status(400).json({
                    ...validationError,
                    _message: err.message
                })
            }

            return response.send(res)
        })
    },

    edit(request, response) {

        let { _id } = request.body

        if (!_id) {
            return response.status(400).json({ ...idNotFound })
        }

        Pessoa.findByIdAndUpdate(_id, request.body, { new: true }, (err, res) => {
            if (err) {
                return response.status(400).json({
                    ...generic,
                    _message: err.message,
                    _id: _id
                })
            }
            else if (!res) {
                return response.status(404).json({
                    ...notFound,
                    _id: _id
                })
            }

            return response.send(res)
        })
    },

    delete(request, response) {

        let { _id } = request.params
        Pessoa.findByIdAndDelete(_id, (err, res) => {
            if (err) {
                return response.status(400).json({
                    ...invalidInformations,
                    _message: err.message
                })
            }

            if (!res) {
                return response.status(404).json({
                    ...notFound,
                    _id: _id
                })
            }

            response.send()
        })
    },

    async addNewFriend(request, response) {
        //TODO: Verificar se o amigo já está adicionado. Se já estiver, não adicionar.

        let { My_id, Friend_id } = request.params

        const Me = await Pessoa.findById(My_id)

        if (!Me) {
            return response.status(404).json({
                ...notFound,
                _id: My_id
            })
        }

        const Friend = await Pessoa.findById(Friend_id)

        if (!Friend) {
            return response.status(404).json({
                ...notFound,
                _id: Friend_id
            })
        }

        const isAlreadyFriend = await Pessoa.find({_id: My_id, amigos: { "$elemMatch": { "_id": Friend_id } } })

        if (!isAlreadyFriend || isAlreadyFriend.length === 0) {
            const Updated = await Pessoa.findByIdAndUpdate(My_id, { "$push": { "amigos": Friend } }, { new: true })

            if (!Updated) {
                return response.status(400).json({
                    ...addFriendError,
                    _message: err.message,
                    My_id: My_id,
                    Friend_id: Friend_id
                })
            }

            return response.send(Updated)
        }
        else {
            return response.status(404).json({ ...friendAlreadyAdded })
        }

    }
}