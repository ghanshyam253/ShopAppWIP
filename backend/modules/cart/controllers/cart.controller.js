const cartmodel = require('../../../models/cart.model')

let addToCart = (req, res) => {
    cartmodel.addToCart({
        "productname": req.body.name,
        "productprice": req.body.price,
         "user_id": req.session.user.id
    })
        .then(cart => {                
                return res.send('added to cart successfully')
        })
        .catch(err => {
            return res.send(422, err.message)
        })
}
module.exports.addToCart = addToCart

let deleteorder = (req, res) => {
    cartmodel.deleteorder(req.params.id)
        .then(cart => {
            return res.send('order item deleted successfully')
        })
        .catch(err => {
            return res.send(422, err.message)
        })
}
module.exports.deleteorder = deleteorder

let getallordersforauser = (req,res) => {
    cartmodel.getallordersforauser(req.session.user.id)
    .then(orders => {
        return res.json(orders)
    })
    .catch(err => {
        return res.send(422, err.message)
    })
}
module.exports.getallordersforauser = getallordersforauser

let updatecart = (req,res) => {
    cartmodel.updatecart(req.body.id, req.body.data)
    .then(cart => {
        return res.send('successs')
    })
    .catch(err => {
        return res.send(422, err.message)
    })
}
module.exports.updatecart = updatecart

let emptycart = (req,res) => {
    cartmodel.emptycart(req.params.id)
    .then(cart => {
        return res.send('successs')
    })
    .catch(err => {
        return res.send(422, err.message)
    })
}
module.exports.emptycart = emptycart