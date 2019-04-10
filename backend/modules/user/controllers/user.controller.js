const usermodel = require('../../../models/user.model')

let getallusers = (req, res) => {
    usermodel.getusers(function (err, users) {
        if (err) res.send(422, err.message)
        return res.json(users)
    })
}

module.exports.getallusers = getallusers

let getonebyid = (req, res) => {
    usermodel.getuserbyid(req.params.id)
        .then(user => {
            return res.json(user)
        })
        .catch(err => {
            if (err) res.send(422, err.message)
        })
}
module.exports.getonebyid = getonebyid

let createuser = (req, res) => {
    usermodel.adduser(req.body)
        .then(user => {
            return res.send('user registered successfully')
        })
        .catch(err => {
            return res.send(422, err.message)
        })
}
module.exports.createuser = createuser

let deleteuser = (req, res) => {
    usermodel.deleteuser(req.params.id)
        .then(user => {
            return res.send('user deleted successfully')
        })
        .catch(err => {
            return res.send(422, err.message)
        })
}
module.exports.deleteuser = deleteuser

let updateuser = (req, res) => {
    usermodel.updateuser(req.params.id,req.body)
        .then(user => {
            return res.send('user updated successfully')
        })
        .catch(err => {
            return res.send(422, err.message)
        })
}
module.exports.updateuser = updateuser

let login = (req, res) => {
    usermodel.updateuser(req.session.user.id,{AccessToken: req.session.token})
        .then(user => {
            res.json({ token: req.session.token, role: req.session.user.role, id: req.session.user.id })
        })
        .catch(err => {
            return res.send(422, err.message)
        })
      
}
module.exports.login = login


let resetpasswordfromapp = (req, res) => {
    usermodel.updateuser(req.session.user.id,{AccessToken: req.session.token})
        .then(user => {
            res.json({ token: req.session.token, role: req.session.user.role, id: req.session.user.id })
        })
        .catch(err => {
            return res.send(422, err.message)
        })
      
}
module.exports.resetpasswordfromapp = resetpasswordfromapp

