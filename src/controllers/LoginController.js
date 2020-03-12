const Pessoa = require('../models/Pessoa');
const jwt = require('jsonwebtoken')

module.exports = {
    async geraToken(request, response){

        let { apelido, senha } = request.body;
        const UsuarioRetorno = await Pessoa.findOne({ apelido : apelido, senha: senha});
        const token = jwt.sign({_id: UsuarioRetorno._id, senha: UsuarioRetorno.senha}, process.env.JWT_KEY, { expiresIn: 300 });
        return response.send({auth : true,  token : token});
    }
}