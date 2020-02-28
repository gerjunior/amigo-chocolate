const mongoose = require('mongoose')

const PessoaSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    sobrenome: String,
    email: { type: String, required: true },
    dataNascimento: Date,
    apelido: String,
    senha: { type: String, required: true },
    descricao: String,
    amigos: [{
        _id: String,
        nome: String,
        apelido: { type: String, required: true, index: true, unique: true },
        descricao: String,
        dataNascimento: String,
        email: String
    }],
    grupos: [{
        _id: String,
        nome: String,
        statusGrupo: String
    }]
})

module.exports = mongoose.model('Pessoa', PessoaSchema)


