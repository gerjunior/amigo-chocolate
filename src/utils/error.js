module.exports = {
    generic: {
        success: false,
        message: "Erro.",
        _message: "..."
    },

    noInformation: {
        success: false,
        message: "Nenhuma informação encontrada."
    },

    notFound: {
        success: false,
        message: "Informação não encontrada.",
        _id: "..."
    },

    validationError: {
        success: false,
        message: "Erro de validação das informações presentes no corpo da requisição.",
        _message: "..."
    },

    idNotFound: {
        success: false,
        message: "_id não encontrado no corpo da requisição."
    },

    invalidInformations: {
        success: false,
        message: "Verifique as informações e tente novamente.",
        _message: "..."
    },

    addFriendError: {
        success: false,
        _message: "...",
        message: "As informações de usuário estão corretas, porém houve um erro ao adicionar amigo.",
        My_id: "...",
        Friend_id: "..."
    },

    friendAlreadyAdded: {
        success: false,
        message: "Vocês já são amigos.",
    }
}

