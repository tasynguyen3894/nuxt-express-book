const { Router } = require('express')
const route = Router()
const contentController = require('../../controllers/content.controller')
const noteRouter = require('./note.router')

route.post('/', contentController.create)
route.get('/', contentController.index)
route.get('/:contentId', contentController.findById)
route.put('/:contentId', contentController.edit)
route.delete('/:contentId', contentController.remove)

route.use(noteRouter)

module.exports = route