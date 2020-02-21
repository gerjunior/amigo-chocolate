const mongoose = require('mongoose')

const PessoaSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    sobrenome: String,
    email: {type: String, required: true},
    dataNascimento: String,
    apelido: String,
    senha: String,
    descricao: String
})

module.exports = {
    Pessoa: mongoose.model('Pessoa', PessoaSchema),
    PessoaSchema: PessoaSchema
}

    