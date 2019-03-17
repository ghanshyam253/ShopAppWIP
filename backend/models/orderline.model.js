const mongoose = require('mongoose')
const Schema = mongoose.Schema 
const orderdetailsSchema = new Schema({
    productname: String,
    quantity: Number,
    orderStatus : String,
    orderDate : String
})


const schema = new Schema({
    orderdetails: { 
        type: [orderdetailsSchema]
    },
    userid: {
        type: String,
        trim: true,
        required: [true, 'userid is missing']
    },
    card: {
        type: Schema.Types.ObjectId,
        ref: 'card',
        required: [true, 'card is missing']
    },
    address: {
        type: Schema.Types.ObjectId,
        ref: 'address',
        required: [true, 'address is missing']
    },
    reviewmessage: {
        type: String,
        trim: true,
        default: ''
    },
    rating: {
        type: Number,
        default: 0
    }

})

const order = mongoose.model('order', schema)


module.exports = {
    getorders: user_id => order.find({userid: user_id}),
    getorderbyorderid: order_id => order.findOne({_id: order_id}),
    
    placeorder: data => new order(data).save(),
    deleteorder: orderid => order.findByIdAndRemove(orderid),
    updateorder: (orderid, data) => order.findByIdAndUpdate(orderid, data),
    getorderbyid: user_id => order.find({ userid: user_id }).populate('card').populate('address'),
    getallorderbyorderstatus : orderstatus => order.find({"orderdetails.orderStatus":orderstatus}).populate('card').populate('address'),
    
    deleteorderfromgrouporder: (completeorderid, specificorderid) => {
        console.log("completeorderid",completeorderid);
        console.log("specificorderid",specificorderid);
        
        return order.updateOne( 
      { _id: completeorderid },
      { $pull: { orderdetails : { _id : specificorderid } } },
      { safe: true },
      function removeConnectionsCB(err, obj) {
        console.log(JSON.stringify(arguments));

      });
    },
    updateOrderStatus: (orderId, status) => {
        console.log("orderId",orderId);
        console.log("status",status);
        var orderDate = new Date()
        return order.updateOne(
            {
                "orderdetails._id" :  orderId
            },
            {
                $set:{
                    'orderdetails.$.orderStatus': status,
                    'orderdetails.$.orderDate': orderDate
                }
            }
        );
    },
    
}