const config = require('./config')
const mongoose = require('mongoose')
console.log(config.url)
mongoose.connect(config.url,{ useNewUrlParser: true })
    .then(res => {
        console.log('DB Connected')
    })
    .catch(err => {
        console.log('DB Not Connected')
    })
