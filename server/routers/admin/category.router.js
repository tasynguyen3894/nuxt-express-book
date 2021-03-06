const { Router } = require('express')
const route = Router()
const categoryController = require('../../controllers/category.controller')

route.post('/', categoryController.create)
route.get('/', categoryController.index)
route.get('/:categoryId', categoryController.findById)
route.put('/:categoryId', categoryController.edit)
route.post('/:categoryId/publish', categoryController.publish)
route.post('/:categoryId/unpublish', categoryController.unpublish)
route.delete('/:categoryId', categoryController.remove)


module.exports = route