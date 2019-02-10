const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema 
const schema = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'name is missing']
    },
    emailaddress: {
        type: String,
        trim: true,
        required: [true, 'email is missing']
    },
    passwordhash: {
        type: String,
        trim: true,
        required: [true, 'password is missing']
    },
    role: {
        type: String,
        trim: true,
        required: [true, 'role is missing']
    },
    phonenumber: {
        type: String,
        trim: true,
        required: [true, 'phonenumber is missing']
    },
    isBlocked: {
        type: Boolean,
        trim: true,
        required: [true, 'isBlocked is missing']
    },
    Username: {
        type: String,
        trim: true,
        required: [true, 'Username is missing']
    },
    AccessToken: {
        type: String,
        trim: true,
        default: ''
    }
})

schema.pre('save', function (next) {
    var user = this;

    if (!user.isModified('passwordhash')) return next();

    bcrypt.hash(user.passwordhash, 10)
        .then(hash => {
            user.passwordhash = hash
            next()
        })
        .catch(err => {
            next(err)
        })

})

schema.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.passwordhash, function (err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};

const user = mongoose.model('user', schema)


module.exports = {
    getusers: (cb) => user.find({}, cb),
    adduser: data => new user(data).save(),
    deleteuser: userid => user.findByIdAndRemove(userid),
    updateuser: (userid, data) => user.findByIdAndUpdate(userid, data),
    getuserbyid: userid => user.findOne({ _id: userid }),
    user: user
}


