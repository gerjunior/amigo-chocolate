const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')

const app = express()

app.use(express.json())
app.use(routes)

mongoose.connect(process.env.connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})

app.listen(3333, () => {
    console.log('Aplicação rodando na porta 3333!')
})
