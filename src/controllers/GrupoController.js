const Grupo = require('../models/Grupo')

module.exports = {
    index(request, response) {

        Grupo.find(request.body, (err, res) => {

            if (!res || res.length === 0){
                return response.status(404).json({ success: false, message: "Nenhuma informação encontrada."})
            }

            return response.send(res)
        })
    },

    getOne(request, response) {
        let { _id } = request.params
        Grupo.findById(_id, (err, res) => {

            if (err || !res) {
                return response.status(404).json({ success: false, message: "Grupo não encontrado.", _id: _id })
            }

            return response.json(res)
        })
    },

    create(request, response) {

        Grupo.create(request.body, (err, res) => {
            if (err) {
                return response.status(400).json({ success: false, _message: err.message, message: "Erro de validação das informações presentes no corpo da requisição."})
            }

            return response.send(res)
        })
    },

    edit(request, response) {

        let { _id } = request.body

        if (!_id) {
            return response.status(400).json({success: false, message: "_id do grupo não encontrado no corpo da requisição." })
        }

        Grupo.findByIdAndUpdate(_id, request.body, { new: true }, (err, res) => {
            if (err) {
                return response.status(400).json({ success: false, message: err.message, _id: _id })
            }
            else if (!res) {
                return response.status(404).json({success: false, message: `O grupo não existe ou pode ter sido excluído.`, _id: _id })
            }
            return response.send(res)
        })
    },

    delete(request, response) {

        let { _id } = request.params
        Grupo.findByIdAndDelete(_id, (err, res) => {
            if (err) {
                return response.status(400).json({ success: false, _message: err.message, message: "Verifique as informações e tente novamente.", _id: _id })
            }

            if (!res) {
                return response.json({ success: false, message: "Grupo não encontrado.", _id: _id })
            }

            response.json({ success: true, message: "Grupo excluído com sucesso.", _id: _id })
        })
    },

    findMember(request, response) {
        let {_id} = request.params

        Grupo.aggregate([
            {
                "$project": {
                    "pessoas": {
                        "$filter": {
                            "input": "$pessoas",
                            "as": "item",
                            "cond": {
                                "$eq": ["$$item.info._id", { "$convert": { "input": `${_id}`, "to": "objectId" } }]
                            }
                        }
                    },
                    "admin": 1,
                    "nome": 1,
                    "valorMinimo": 1,
                    "valorMaximo": 1,
                    "dataSorteio": 1,
                    "statusGrupo": 1
                }
            }
        ], (err, res) => {
            
            if (err) {
                return response.status(400).json({ success: false, _message: err.message, message: "Verifique as informações e tente novamente.", _id: _id })
            }
    
            if (!res) {
                return response.json({ success: false, message: "O usuário não está em nenhum grupo.", _id: _id })
            }

            return response.send(res)
        })
    }
}