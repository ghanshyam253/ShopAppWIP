const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    street: {
        type: String,
        trim: true,
        required: [true, 'street missing']
    },
    city: {
        type: String,
        trim: true,
        required: [true, 'city missing']
    },
    state: {
        type: String,
        trim: true,
        required: [true, 'state missing']
    },
    zipcode: {
        type: String,
        trim: true,
        required: [true, 'Zip missing']
    },
    userid: {
        type: String,
        trim: true,
        required: [true, 'userid missing']
    }
})

const address = mongoose.model('address', schema)


module.exports = {
    addaddress: data => new address(data).save(),
    deleteaddress: addressid => address.findByIdAndRemove(addressid),
    updateaddress: (addressid, data) => address.findByIdAndUpdate(addressid, data),
    getalladdressforauser: user_id => address.find({ userid: user_id })
}
