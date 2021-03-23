const Pessoa = require('../../pessoa/models/Pessoa');
const jwt = require('jsonwebtoken');

module.exports = {
  async geraToken(request, response) {
    let { apelido, senha } = request.body;
    const userResponse = await Pessoa.findOne({ apelido: apelido, senha: senha });
    // eslint-disable-next-line no-undef
    const token = jwt.sign({ _id: userResponse._id, senha: userResponse.senha }, process.env.JWT_KEY, { expiresIn: 1 });
    return response.send({ auth: true, token: token });
  },
};
