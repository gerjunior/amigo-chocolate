const express = require('express')
const mongoose = require('mongoose')

const routes = require('./routes')
const connectionString = require('../mongo')

const app = express()

app.use(express.json())
app.use(routes)

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

app.listen(3333, () => {
    console.log('App listening on port 3333!')
})
