const cardmodel = require('../../../models/card.model')

let addcard = (req, res) => {
    cardmodel.addcard(req.body)
        .then(card => {                
                return res.json({
                    id: card.id,
                    message: "card added successfully"
                })
        })
        .catch(err => {
            return res.send(422, err.message)
        })
}
module.exports.addcard = addcard

let deletecard = (req, res) => {
    cardmodel.deletecard(req.params.id)
        .then(card => {
            return res.send('card deleted successfully')
        })
        .catch(err => {
            return res.send(422, err.message)
        })
}
module.exports.deletecard = deletecard

let updatecard = (req, res) => {
    cardmodel.updatecard(req.params.id,req.body)
        .then(card => {
            return res.send('card updated successfully')
        })
        .catch(err => {
            return res.send(422, err.message)
        })
}
module.exports.updatecard = updatecard

let getallcardforauser = (req,res) => {
    cardmodel.getallcardforauser(req.params.userid)
    .then(cardes => {
        return res.json(cardes)
    })
    .catch(err => {
        return res.send(422, err.message)
    })
}
module.exports.getallcardforauser = getallcardforauser