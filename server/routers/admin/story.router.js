const { Router } = require('express')
const route = Router()
const storyController = require('../../controllers/story.controller')
const chapRouter = require('./chap.router')

route.post('/', storyController.create)
route.get('/', storyController.index)
route.get('/:storyId', storyController.findById)
route.put('/:storyId', storyController.edit)
route.delete('/:storyId', storyController.remove)

route.use(chapRouter)

module.exports = route