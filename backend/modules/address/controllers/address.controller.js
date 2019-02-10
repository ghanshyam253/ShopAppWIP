const addressmodel = require('../../../models/address.model')

let addaddress = (req, res) => {
    addressmodel.addaddress(req.body)
        .then(address => {                
                return res.json({
                    ...address,
                    message: "address added successfully"
                })
        })
        .catch(err => {
            return res.send(422, err.message)
        })
}
module.exports.addaddress = addaddress

let deleteaddress = (req, res) => {
    addressmodel.deleteaddress(req.params.id)
        .then(address => {
            return res.send('address deleted successfully')
        })
        .catch(err => {
            return res.send(422, err.message)
        })
}
module.exports.deleteaddress = deleteaddress

let updateaddress = (req, res) => {
    addressmodel.updateaddress(req.params.id,req.body)
        .then(address => {
            return res.send('address updated successfully')
        })
        .catch(err => {
            return res.send(422, err.message)
        })
}
module.exports.updateaddress = updateaddress

let getalladdressforauser = (req,res) => {
    addressmodel.getalladdressforauser(req.params.userid)
    .then(addresses => {
        return res.json(addresses)
    })
    .catch(err => {
        return res.send(422, err.message)
    })
}
module.exports.getalladdressforauser = getalladdressforauser