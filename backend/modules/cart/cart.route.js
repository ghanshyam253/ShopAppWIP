const express = require('express')
const router = express.Router()
const cartcontroller = require('./controllers/cart.controller')

router.post('/addtocart', cartcontroller.addToCart)

router.post('/delete/:id', cartcontroller.deleteorder)

router.get('/getallforuser', cartcontroller.getallordersforauser)

router.post('/updatecart', cartcontroller.updatecart)

router.post('/emptycart/:id', cartcontroller.emptycart)

module.exports = router