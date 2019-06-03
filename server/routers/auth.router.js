const { Router } = require('express')
const route = Router()
const authController = require('../controllers/auth.controller')

route.post('/register', authController.register)
route.post('', authController.user)
// route.get('', authController.index)
route.post('/login', authController.login)

module.exports = route