const express = require('express')
const router = express.Router()
const usercontroller = require('./controllers/user.controller')
const auth = require('../core/middleware')
router.get('/all', auth, usercontroller.getallusers)

router.get('/getone/:id', auth, usercontroller.getonebyid)

router.post('/create', usercontroller.createuser)

router.post('/delete/:id', auth, usercontroller.deleteuser)

router.post('/edit/:id', auth, usercontroller.updateuser)

router.post('/login', auth, usercontroller.login)

module.exports = router