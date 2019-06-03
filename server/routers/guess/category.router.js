const { Router } = require('express')
const route = Router()
const categoryController = require('../../controllers/category.controller')

route.get('/', categoryController.index)
route.get('/:categoryId', categoryController.findById)

module.exports = route