const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
mongoose.connect(process.env.mongodb_uri);
const db = mongoose.connection;
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    }
})

userSchema.statics.authenticate = function(email, password, callback) {
    User.findOne({ email: email })
    .exec(function (err, user) {
        if (err) {
            return callback(err, {z: 1})
        } else if (!user) {
            var err = new Error('User not found.');
            err.status = 401;
            return callback({ status: 401 }, null);
        }
        bcrypt.compare(password, user.password, function (err, result) {
            if (result === true) {
                return callback({ status: 200, token: jwt.sign({email: email}, process.env.secret_key) }, user);
            } else {
                return callback({status: 404}, null);
            }
        })
    });
}

userSchema.statics.verifyToken = function (token) {
    try {
        var decoded = jwt.verify(token, process.env.secret_key)
        return true;
    } catch (error) {
        return false;
    }
}

userSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    })
});

userSchema.method('transform', function () {
    var user = this.toObject()
    user.id = user._id
    delete user._id
    delete user.__v
    delete user.password
    return user
})

var User = db.model('User', userSchema);
module.exports = User;