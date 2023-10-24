const { Router } = require('express')
const { allOneCart, postCart } = require('../controllers/cart.controller')

const router = Router()

router.get('/carts/:cid', allOneCart)
router.post('/carts', postCart)

module.exports = router