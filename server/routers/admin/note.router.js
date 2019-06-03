const { Router } = require('express')
const route = Router()
const noteController = require('../../controllers/note.controller')
const preFix = '/:contentId/notes'

route.get(preFix, noteController.index)
route.post(preFix, noteController.create)
route.get(preFix + '/:noteId', noteController.findById)
route.put(preFix + '/:noteId', noteController.edit)
route.delete(preFix + '/:noteId', noteController.remove)

module.exports = route