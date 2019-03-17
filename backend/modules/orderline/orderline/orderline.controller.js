const orderlinemodel = require('../../../models/orderline.model')
const ObjectId = require('mongoose').Schema.Types.ObjectId
let addorder = (req, res) => {
    // req.body.productid = ObjectId(req.body.productid)
    console.log(req.body)
    orderlinemodel.placeorder(req.body)
        .then(order => {                
                return res.send('order added successfully')
        })
        .catch(err => {
            return res.send(422, err.message)
        })
}
module.exports.addorder = addorder

let deleteorder = (req, res) => {
    orderlinemodel.deleteorder(req.params.id)
        .then(order => {
            return res.send('order deleted successfully')
        })
        .catch(err => {
            return res.send(422, err.message)
        })
}
module.exports.deleteorder = deleteorder

let deleteorderfromgrouporder = (req, res) => {
    console.log("req.parms");
    console.log(JSON.stringify(req.params));
    console.log("req.parms");
    var completeorderid = req.params.completeorderid;
     var specificorderid = req.params.specificorderid;
     debugger;
     console.log("calling deleteorderfromgrouporder");
    orderlinemodel.deleteorderfromgrouporder(completeorderid, specificorderid)
        .then(order => {
            console.log("checking response of deleteorderfromgrouporder");
            
            (orderlinemodel.getorderbyorderid(completeorderid))
                .then(completeOrder =>{
                    console.log("getorderbyorderid=>")
                    console.log(JSON.stringify(completeOrder));
                    if(!completeOrder.orderdetails || !completeOrder.orderdetails instanceof Array || completeOrder.orderdetails.length==0){
                        console.log("deleteding complete order")
                        orderlinemodel.deleteorder(completeorderid)
                        .then(order => {
                            return res.send('order deleted successfully')
                        })
                        .catch(err => {
                            return res.send('order deleted successfully')
//                            return res.send(422, err.message)
                        })
                    }else{
                        console.log("NOT deleteding complete order")
                        return res.send('order deleted successfully')
                    }
                })
                .catch(err => {
                    return res.send('order deleted successfully')
                })
//             return res.json(order)
//            return res.send('order deleted successfully')
        })
        .catch(err => {
            return res.send(422, err.message)
        })
}
module.exports.deleteorderfromgrouporder = deleteorderfromgrouporder

let updateorder = (req, res) => {
    console.log(JSON.stringify(req.body))
    orderlinemodel.updateorder(req.params.id,req.body.reviewformdata)
        .then(order => {
            return res.send('order updated successfully')
        })
        .catch(err => {
            return res.send(422, err.message)
        })
}
module.exports.updateorder = updateorder

let getallorderforauser = (req,res) => {
    orderlinemodel.getorderbyid(req.params.userid)
    .then(orders => {
        return res.json(orders)
    })
    .catch(err => {
        return res.send(422, err.message)
    })
}
module.exports. getallorderforauser = getallorderforauser

let getorderforanid = (req,res) => {
    orderlinemodel.getorderforanid(req.params.userid)
    .then(order => {
        return res.json(order)
    })
    .catch(err => {
        return res.send(422, err.message)
    })
}
module.exports.getorderforanid = getorderforanid


let getpendingorder = (req,res) => {
    orderlinemodel.getorderbyorderstatus("ORDER PLACED")
    .then(order => {
        return res.json(order)
    })
    .catch(err => {
        return res.send(422, err.message)
    })
}
module.exports.getpendingorder = getpendingorder

let getallordersbystatus = (req,res) => {
    console.log(req.params)
    console.log(JSON.stringify(req.params));
    console.log(JSON.stringify(req.query));
    
    orderlinemodel.getallorderbyorderstatus(req.query.orderstatus)
    .then(order => {
        return res.json(order)
    })
    .catch(err => {
        return res.send(422, err.message)
    })
}
module.exports.getallordersbystatus = getallordersbystatus

let updateOrderStatus = (req,res) => {
    console.log("updateOrderStatus");
    console.log(JSON.stringify(req.params));
    console.log(JSON.stringify(req.query));
    var orderId = req.query.orderId;
    var status = req.query.status;
//    return res.json("order");
    orderlinemodel.updateOrderStatus(orderId, status)
    .then(order => {
        return res.json(order)
    })
    .catch(err => {
        return res.send(422, err.message)
    })
}
module.exports.updateOrderStatus = updateOrderStatus
