const { Pessoa } = require('../models/Pessoa')

module.exports = {
    index(request, response) {

        Pessoa.find(request.body, (err, res) => {

            return response.send(res)
        })
    },

    getOne(request, response) {
        let { _id } = request.params
        Pessoa.findById(_id, (err, res) => {

            if (err || !res) {
                return response.status(404).json({ success: false, message: "Usuário não encontrado.", _id: _id })
            }

            return response.json(res)
        })
    },

    create(request, response) {

        Pessoa.create(request.body, (err, res) => {
            if (err) {
                return response.status(400).json({ success: false, _message: err.message, message: "Erro de validação das informações presentes no corpo da requisição."})
            }

            return response.send(res)
        })
    },

    edit(request, response) {

        let { _id } = request.body

        if (!_id) {
            return response.status(400).json({success: false, message: "_id do usuário não encontrado no corpo da requisição." })
        }

        Pessoa.findByIdAndUpdate(_id, request.body, { new: true }, (err, res) => {
            if (err) {
                return response.status(400).json({ success: false, message: err.message, _id: _id })
            }
            else if (!res) {
                return response.status(404).json({success: false, message: `Usuário não encontrado.`, _id: _id })
            }
            console.log(res)
            return response.send(res)
        })
    },

    delete(request, response) {

        let { _id } = request.params
        Pessoa.findByIdAndDelete(_id, (err, res) => {
            if (err) {
                return response.status(400).json({ success: false, _message: err.message, message: "Verifique as informações e tente novamente.", _id: _id })
            }

            if (!res) {
                return response.json({ success: false, message: "Usuário não encontrado.", _id: _id })
            }

            response.json({ success: true, message: "Usuário removido com sucesso.", _id: _id })
        })
    }
}