const express = require('express')
const router = express.Router()
const addresscontroller = require('./controllers/address.controller')

router.post('/create', addresscontroller.addaddress)

router.post('/delete/:id', addresscontroller.deleteaddress)

router.post('/edit/:id', addresscontroller.updateaddress)

router.get('/getallforuser/:userid', addresscontroller.getalladdressforauser)

module.exports = router