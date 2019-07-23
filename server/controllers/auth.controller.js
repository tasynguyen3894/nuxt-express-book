const User = require('../models/user.model')
const userHelper = require('../helpers/user.helper')
const jwt = require('jsonwebtoken')
const moment = require('moment')

function register(req, res, next) {

    var userData = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
    }

    User.create(userData, function (error, user) {
        if (error) {
            res.status = 422
            res.json({stauts: false, message: 'error'})
        } else {
            res.json({stauts: true, message: 'success'})
        }
    });
}

function login(req, res, next) {
    User.authenticate(req.body.email, req.body.password, function (data, user) {
        res.status(data.status)
        if(data.status == 200) {
            res.json({ user: userHelper.modelTransform(user), token: data.token, refesh_token: data.refesh_token })
        } else {
            res.json({ message: 'Error', status: data.status })
        }
    })
}

function index(req, res, next) {
    User.find().exec().then((data) => {
        let users = data.map(function (user) {
            return user.transform();
        })
        res.status(200)
        res.json({
            users: users
        })
    }).catch(next)
}

function user(req, res, next) {
    if(!req.headers['tasy-book-token']) {
        res.status(401)
        res.json({
            message: 'token missing'
        })
        return false
    }
    let tasyBookToken = req.headers['tasy-book-token']
    let decodeInfo = jwt.verify(tasyBookToken, process.env.secret_key)
    if(!decodeInfo || !decodeInfo.email) {
        res.status(401)
        res.json({
            message: 'wrong token',
        })
        return false
    }
    User.findOne({email: decodeInfo.email}, function (err, user) {
        if(err) {
            res.status(404)
            res.json({
                message: 'user not found'
            }) 
            return false
        }
        res.status(200)
        res.json({
            user: user.transform()
        }) 
    })
    return true;
}

function refesh_token(req, res, next) {
    let {token, refesh_token} = req.body
    if(!token || !refesh_token) {
        res.status(401)
        res.json({
            message: "bad request"
        })
        return false
    }
    try {
        let tokenDecoded = jwt.verify(token, process.env.secret_key)
        let refeshTokenDecoded = jwt.verify(refesh_token, process.env.secret_key)
        if(refeshTokenDecoded.token != token) {
            res.status(401)
            res.json({
                message: "bad request"
            })
            return false;
        }
        let newToken = jwt.sign({
                email: tokenDecoded.email, 
                id: tokenDecoded.id, 
                expired_at: moment().add(8, 'hours')
            }, process.env.secret_key)
        let newRefeshToken = jwt.sign({token: newToken}, process.env.secret_key);
        res.status(201)
        res.json({
            token: newToken,
            refesh_token: newRefeshToken
        })
        return true
    } catch (error) {
        res.status(401)
        res.json({
            message: "bad request"
        })
        return false;
    }
}

module.exports = {
    register: register,
    login: login,
    index: index,
    user: user,
    refesh_token: refesh_token
}