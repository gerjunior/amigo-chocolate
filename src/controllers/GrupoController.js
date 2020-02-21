const Grupo = require('../models/Grupo')

module.exports = {
    async index(request, response){
        const grupos = await Grupo.find()

        return response.send(grupos)
    },

    async getOne(request, response){
        let { _id } = request.params
        const grupo = await Grupo.findById(_id)

        return response.send(grupo)
    },

    async create(request, response){
        const grupo = await Grupo.create(request.body)

        return response.send(grupo)
    },

    async edit(request, response){
        const grupo = await Grupo.findByIdAndUpdate(request.body)

        return response.send(grupo)
    },

    async delete(request, response){
        let { _id } = request.params
        const deleted = Grupo.deleteOne(_id)

        return response.send(deleted)
    }
}
//GRUPO.FIND() onde tiver como membro o _id da pessoa