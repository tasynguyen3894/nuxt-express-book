const User = require('../models/user.model')

function auth(req, res, next) {
    if(!req.headers['tasy-book-token']) {
        res.status(401)
        res.json({
            status: false,
            message: 'token missing'
        })
        return;
    } else {
        if(User.verifyToken(req.headers['tasy-book-token'])) {
            next()
            return true
        }
        res.status(401)
        res.json({
            status: false,
            message: 'wrong token'
        })
        return false
    }
}

module.exports = {
    auth: auth
}