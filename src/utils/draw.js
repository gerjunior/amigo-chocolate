const draw = (integrantes) => {
    let integrantesEscolhidos = integrantes.map(item => {
        return { apelido: item.apelido, amigoChocolate: null, chosenByAnother: false }
    })

    let members = integrantes.map(item => {
        return item.apelido
    })

    for (let i = 0; i < integrantesEscolhidos.length; i++) {

        if (!integrantesEscolhidos[i].amigoChocolate === null) {
            continue
        }

        while (!integrantesEscolhidos[i].amigoChocolate) {
            let amigoChocolate = integrantesEscolhidos[Math.floor(Math.random() * integrantesEscolhidos.length)]

            if ((integrantesEscolhidos.length - 1 !== i) && //SE NÃO FOR O ÚLTIMO MEMBRO DA LISTA E
                integrantesEscolhidos[i].apelido === amigoChocolate.apelido || //SE O AMIGO NÃO FOR EU MESMO OU
                amigoChocolate.chosenByAnother) { //SE O AMIGO CHOCOLATE JÁ NÃO FOI ESCOLHIDO
                continue
            }

            integrantesEscolhidos[i].amigoChocolate = amigoChocolate.apelido
            let amigoIndex = members.indexOf(amigoChocolate.apelido)
            integrantesEscolhidos[amigoIndex].chosenByAnother = true
        }
    }

    let amigosOcultos = integrantesEscolhidos.map(item => {
        return { apelido: item.apelido, amigoOculto: item.amigoChocolate }
    })

    return amigosOcultos
}

module.exports = draw