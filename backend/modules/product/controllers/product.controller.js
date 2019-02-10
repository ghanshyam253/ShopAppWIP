const productmodel = require('../../../models/product.model')
const fs = require('fs')
const path = require('path')

let getallproducts = (req, res) => {
    productmodel.getproducts(function (err, products) {
        if (err) res.send(422, err.message)
        return res.json(products)
    })
}

module.exports.getallproducts = getallproducts

let getonebyid = (req, res) => {
    productmodel.getproductbyid(req.params.id)
        .then(product => {
            return res.json(product)
        })
        .catch(err => {
            if (err) res.send(422, err.message)
        })
}
module.exports.getonebyid = getonebyid

let createproduct = (req, res) => {
    buffer = req.file && req.file.buffer ? req.file.buffer : undefined
    productmodel.addproduct(req.body)
        .then(product => {
            fs.open('images/' + product.id, 'w', function (err, fd) {
                if (err) return res.status(422).send('error opening file')
                if(!buffer) return res.status(422).send('error opening file')
                fs.write(fd, buffer, 0, buffer.length, null, function (err) {
                    if (err) return res.status(422).send('error writing file')
                    fs.close(fd, function () {
                        console.log('file written')
                    })
                   return res.send('product added successfully')
                })
            })
        })
        .catch(err => {
            return res.send(422, err.message)
        })
}
module.exports.createproduct = createproduct

let deleteproduct = (req, res) => {
    productmodel.deleteproduct(req.params.id)
        .then(product => {
            fs.unlink(path.join(__dirname, '../../../images', req.params.id), (err) => {
                if (err) throw err
                return res.send('product deleted successfully')
            })
        })
        .catch(err => {
            return res.send(422, err.message)
        })
}
module.exports.deleteproduct = deleteproduct

let updateproduct = (req, res) => {
    productmodel.updateproduct(req.params.id,req.body)
        .then(product => {
            return res.send('product updated successfully')
        })
        .catch(err => {
            return res.send(422, err.message)
        })
}
module.exports.updateproduct = updateproduct

let imagebyid = (req, res) => {
    res.sendFile(path.join(__dirname, '../../../images', req.query._id.trim()), function (err) {
        console.log(err)
    })
}

module.exports.imagebyid = imagebyid