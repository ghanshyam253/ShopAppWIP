const express = require('express')
const router = express.Router()
const ordercontroller = require('./orderline/orderline.controller')

router.post('/create', ordercontroller.addorder)

router.post('/delete/:id', ordercontroller.deleteorder)

router.post('/deleteorderfromgrouporder/:completeorderid/:specificorderid', ordercontroller.deleteorderfromgrouporder)

router.post('/edit/:id', ordercontroller.updateorder)

router.get('/getallforuser/:userid', ordercontroller.getallorderforauser)

router.get('/getorder/:userid', ordercontroller.getorderforanid)

router.get('/getPendingOrders', ordercontroller.getpendingorder)

router.get('/getAllOrdersByStatus', ordercontroller.getallordersbystatus)

router.post('/updateOrderStatus', ordercontroller.updateOrderStatus)

module.exports = router