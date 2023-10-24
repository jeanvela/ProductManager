const { Router } = require('express')
const cartRoutes = require('./cart.routes')
const productsRoutes = require('./products.routes')

const router = Router()

router.use('/api', cartRoutes)
router.use('/api', productsRoutes)

module.exports = router