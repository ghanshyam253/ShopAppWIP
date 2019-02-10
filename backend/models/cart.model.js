const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    productname: {
        type: String,
        trim: true,
        required: [true, 'product name missing']
    },
    productprice: {
        type: Number,
        trim: true,
        required: [true, 'product price missing']
    },
    quantity: {
        type: Number,
        trim: true,
        default: 0
    },
    user_id:{
        type: String,
        trim: true,
        required: [true, 'user missing']
    }
})

const cart = mongoose.model('cart', schema)


module.exports = {
    addToCart: data => new cart(data).save(),
    deleteorder: cartid => cart.findByIdAndRemove(cartid),
    getallordersforauser: user_id => cart.find({ user_id: user_id }),
    updatecart: (cartid,data) => cart.findByIdAndUpdate(cartid, data),
    emptycart: user_id => cart.remove({ user_id: user_id})
}
