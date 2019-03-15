const express = require('express')
const router = express.Router()
const productcontroller = require('./controllers/product.controller')
const auth = require('../../modules/core/middleware')

const multer = require('multer')
router.get('/all',auth, productcontroller.getallproducts)

router.get('/getone/:id', productcontroller.getonebyid)

router.post('/create', multer().single('image'), productcontroller.createproduct)

router.post('/delete/:id', productcontroller.deleteproduct)

router.post('/edit/:id', productcontroller.updateproduct)

module.exports = router