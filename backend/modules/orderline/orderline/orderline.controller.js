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

let updateorder = (req, res) => {
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
module.exports.getallorderforauser = getallorderforauser

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

