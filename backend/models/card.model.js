const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'name is missing']
    },
    cardnumber: {
        type: String,
        trim: true,
        required: [true, 'cardnumber is missing']
    },
    cvv: {
        type: String,
        trim: true,
        required: [true, 'cvv is required']
    },
    expirydate: {
        type: String,
        trim: true,
        required: [true, 'expiry date is required']
    },
    userid: {
        type: String,
        trim: true,
        required: [true, 'user id is missing']
    }
})

const card = mongoose.model('card', schema)


module.exports = {
    addcard: data => new card(data).save(),
    deletecard: cardid => card.findByIdAndRemove(cardid),
    updatecard: (cardid, data) => card.findByIdAndUpdate(cardid, data),
    getallcardforauser: user_id => card.find({ userid: user_id })
}
