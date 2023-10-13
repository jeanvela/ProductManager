const express = require("express")
const morgan = require("morgan")
const newProduct = require('../ProductManager')

const app = express()

app.use(morgan('dev'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.get('/products', async (req, res) => {
    const { query } = req
    try {
        const { limit } = query
        if (limit) {
            const numbersProducts = await newProduct.getNumberProducts(limit)
            return res.status(200).json(numbersProducts)
        }
        const products = await newProduct.getProducts()
        return res.status(200).json({products})
    } catch (error) {
        return res.status(404).json({msg: error.message})
    }
})

app.post('/postProduct', async (req, res) => {
    const { title, description, price, thumbnail, code, stock } = req.body
    try {
        const isUndefined = {title, description, price, thumbnail, code, stock}
        if (Object.values(isUndefined).includes(undefined)) throw new Error('All fields are required')
        const createProduct = await newProduct.addProducts(title, description, price, thumbnail, code, stock)
        if (createProduct.error) throw new Error('Code repeats')
        return res.status(200).send(createProduct)
    } catch (error) {
        return res.status(404).json({msg: error.message})
    }
})

app.get('/products/:id', async (req, res) => {
    const { id } = req.params
    try {
        const idProduct = await newProduct.getProductById(id)
        if (idProduct.message) throw new Error('Not found')
        return res.status(200).json(idProduct)
    } catch (error) {
        return res.status(404).json({msg: error.message})
    }
})

module.exports = app