const { Router } = require('express')
const route = Router()
const userController = require('../../controllers/user.controller')

route.get('/:userId', userController.findById)

module.exports = route