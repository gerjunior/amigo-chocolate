const mongoose = require('mongoose')
const { PessoaSchema } = require('./Pessoa')

const GrupoSchema = new mongoose.Schema({
    admin: PessoaSchema,
    nome: String,
    valorMinimo: Number,
    valorMaximo: Number,
    dataSorteio: Date,
    statusGrupo: String,
    pessoas: [{
        info: PessoaSchema,
        desejos: [String],
        amigoChocolate: {
            info: PessoaSchema,
            desejos: [String],
        }
    }]
})

module.exports = mongoose.model('Grupo', GrupoSchema)