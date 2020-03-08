const mongoose = require('mongoose')

const GrupoSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    valorMinimo: Number,
    valorMaximo: Number,
    statusGrupo: String,
    dataSorteio: Date,
    dataRevelacao: Date,
    admin: {
        _id: String,
        nome: String,
        apelido: {type: String, required: true},
        descricao: String,
        dataNascimento: String,
        email: String
    },
        integrantes: [{
        _id: String,
        nome: String,
        apelido: String,
        descricao: String,
        dataNascimento: String,
        email: String,
        desejos: [String],
        amigoChocolate: {
            _id: String,
            nome: String,
            apelido: String,
            descricao: String,
            dataNascimento: String,
            email: String,
            desejos: [String]
        }
    }]
})

module.exports = mongoose.model('Grupo', GrupoSchema)