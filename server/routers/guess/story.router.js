const { Router } = require('express')
const route = Router()
const storyController = require('../../controllers/story.controller')
const chapRouter = require('./chap.router')

route.get('/', storyController.index)
route.get('/:storyId', storyController.findById)

route.use(chapRouter)

module.exports = route