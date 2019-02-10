const mongoose = require('mongoose')


const schema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'name missing']
    },
    description: {
        type: String,
        trim: true,
        required: [true, 'description missing']
    },
    price: {
        type: Number,
        trim: true,
        required: [true, 'price missing']
    },
    ratingavg: {
        type: Number,
        trim: true
    }
})


const product = mongoose.model('product', schema)


module.exports = {
    getproducts: (cb) => product.find({}, cb),
    addproduct: data => new product(data).save(),
    deleteproduct: productid => product.findByIdAndRemove(productid),
    updateproduct: (productid, data) => product.findByIdAndUpdate(productid, data),
    getproductbyid: productid => product.findOne({_id: productid })
}


