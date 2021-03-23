const jwt = require('jsonwebtoken');
const Pessoa = require('../../pessoa/models/Pessoa');

module.exports = {
  async geraToken(request, response) {
    const { apelido, senha } = request.body;
    const userResponse = await Pessoa.findOne({ apelido, senha });
    // eslint-disable-next-line no-undef
    const token = jwt.sign({ _id: userResponse._id, senha: userResponse.senha }, process.env.JWT_KEY, { expiresIn: 1 });
    return response.send({ auth: true, token });
  },
};
