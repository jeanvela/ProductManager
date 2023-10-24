const { Router } = require('express')
const { allProducts, productById, createProduct, updateProduct, deleteProduct, productCart } = require('../controllers/products.controller')

const router = Router()

router.get('/products', allProducts)
router.get('/products/:id', productById)
router.post('/products', createProduct)
router.put('/products/:pid', updateProduct)
router.delete('/products/:pid', deleteProduct)
router.post('/:cid/product/:pid', productCart)


module.exports = router