const express = require("express")
const morgan = require("morgan")
const router = require('./routes/index')

const app = express()

app.use(morgan('dev'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use('/', router)
app.get('/', (req, res) => {
    res.send('Hello world')
})

module.exports = app