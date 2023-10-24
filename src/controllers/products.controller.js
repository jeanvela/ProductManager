const newProduct = require('../../ProductManager')
const Cart = require('../../Cart')

const allProducts = async (req, res) => {
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
}

const productById = async (req, res) => {
    const { id } = req.params
    try {
        const idProduct = await newProduct.getProductById(id)
        if (idProduct.message) throw new Error('Not found')
        return res.status(200).json(idProduct)
    } catch (error) {
        return res.status(404).json({msg: error.message})
    }
}

const createProduct = async (req, res) => {
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
}

const updateProduct = async (req, res) => {
    const { pid } = req.params
    const { title, description, price, thumbnail, code, stock } = req.body
    try {
        const productUpdate = await newProduct.updateProduct(pid, title, description, price, thumbnail, code, stock)

        if (productUpdate.error) throw new Error(productUpdate.error.message)

        return 'product update success'
    } catch (error) {
        return res.status(404).json({msg: error.message})
    }
}

const deleteProduct = async (req, res) => {
    const { pid } = req.params
    try {
        const oneProduct = await newProduct.deleteProduct(pid)
        if (oneProduct.error) throw new Error('not found')
        console.log(oneProduct)
        return res.status(200).send('delete success')
    } catch (error) {
        return res.status(404).json({msg: error.message})
    }
}

const productCart = async (req, res) => {
    const { cid, pid } = req.params
    try {
        if (!cid || !pid) throw new Error('not found')
        const oneProduct = await newProduct.getProductById(pid)
        if (oneProduct.message) throw new Error('Product not found')
        const addedProduct = await Cart.saveProduct(cid, pid)
        return res.status(200).send(addedProduct)
    } catch (error) {
        return res.status(404).json({error: error.message})
    }
}

module.exports = {
    allProducts,
    productById,
    createProduct,
    updateProduct,
    deleteProduct,
    productCart
}