const Cart = require('../../Cart')

const postCart = async (req, res) => {
    try {
        const newCart = await Cart.createCart()
        return res.status(200).json(newCart)
    } catch (error) {
        return res.status(404).json({error: error.message})
    }
}

const allOneCart = async (req, res) => {
    const { cid } = req.params
    try {
        const oneCart = await Cart.getCart(cid)
        return res.status(200).json(oneCart)
    } catch (error) {
        return res.status(404).json({error: error.message})
    }
}

module.exports = {
    postCart,
    allOneCart
}