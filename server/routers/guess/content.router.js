const { Router } = require('express')
const route = Router()
const contentController = require('../../controllers/content.controller')
const noteRouter = require('./note.router')

route.get('/', contentController.index)
route.get('/:contentId', contentController.findById)

route.use(noteRouter)

module.exports = route