var express = require('express');
var router = express.Router();
const auth = require('../modules/core/middleware')
const productcontroller = require('../modules/product/controllers/product.controller')
/* GET home page. */
router.use('/user', require('../modules/user/user.route'))
router.use('/address',auth, require('../modules/address/address.route') )
router.use('/product',auth, require('../modules/product/product.route'))
router.use('/order',auth, require('../modules/orderline/orderline.route'))
router.use('/cart',auth, require('../modules/cart/cart.route'))
router.use('/card',auth, require('../modules/card/card.route'))
router.use('/image', productcontroller.imagebyid)
module.exports = router;
