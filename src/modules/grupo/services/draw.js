const draw = (integrantes) => {
  const integrantesEscolhidos = integrantes.map((item) => ({
    apelido: item.apelido,
    amigoChocolate: null,
    chosenByAnother: false,
  }));

  const members = integrantes.map((item) => item.apelido);

  for (let i = 0; i < integrantesEscolhidos.length; i++) {
    while (!integrantesEscolhidos[i].amigoChocolate) {
      const amigoChocolate = integrantesEscolhidos[Math.floor(Math.random() * integrantesEscolhidos.length)];

      if (
        integrantesEscolhidos[i].apelido === amigoChocolate.apelido || // SE O AMIGO NÃO FOR EU MESMO OU
        amigoChocolate.chosenByAnother
      ) {
        // SE O AMIGO CHOCOLATE JÁ NÃO FOI ESCOLHIDO
        continue;
      }

      integrantesEscolhidos[i].amigoChocolate = amigoChocolate.apelido;
      const amigoIndex = members.indexOf(amigoChocolate.apelido);
      integrantesEscolhidos[amigoIndex].chosenByAnother = true;
    }
  }

  const amigosOcultos = integrantesEscolhidos.map((item) => ({
    apelido: item.apelido,
    amigoOculto: item.amigoChocolate,
  }));

  return amigosOcultos;
};

module.exports = draw;
