const userModel = require('../models/user.model')
const userHelper = require('../helpers/user.helper')

function findById(req, res, next) {
    var userId = req.params.userId
    if(!userId) {
        res.status(400)
        res.json({
            message: 'Bad request'
        })
        return false;
    }
    userModel.findById(userId, function (err, doc) {
        if(doc) {
            res.status(200)
            res.json({
                user: userHelper.modelTransform(doc)
            })
            return true
        }
        res.status(404)
        res.json({
            message: 'user not found'
        })
        return false
    })
}
module.exports = {
    findById: findById
}