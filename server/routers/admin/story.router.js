const { Router } = require('express')
const route = Router()
const storyController = require('../../controllers/story.controller')
const chapRouter = require('./chap.router')

route.post('/', storyController.create)
route.get('/', storyController.findAdmin)
route.get('/:storyId', storyController.findById)
route.put('/:storyId', storyController.edit)
route.post('/:storyId/publish', storyController.publish)
route.post('/:storyId/unpublish', storyController.unpublish)
route.delete('/:storyId', storyController.remove)

route.use(chapRouter)

module.exports = route