const { Router } = require('express')
const route = Router()
const noteController = require('../../controllers/note.controller')
const preFix = '/:contentId/notes'

route.get(preFix, noteController.index)
route.get(preFix + '/:noteId', noteController.findById)

module.exports = route