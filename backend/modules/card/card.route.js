const express = require('express')
const router = express.Router()
const cardcontroller = require('./controllers/card.controller')

router.post('/addcard', cardcontroller.addcard)

router.post('/delete/:id', cardcontroller.deletecard)

router.post('/edit/:id', cardcontroller.updatecard)

router.get('/getallforuser/:userid', cardcontroller.getallcardforauser)

module.exports = router