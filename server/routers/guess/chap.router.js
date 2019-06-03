const { Router } = require('express')
const route = Router()
const chapController = require('../../controllers/chap.controller')
const preFix = '/:storyId/chaps'

route.get(preFix, chapController.index)
route.post(preFix, chapController.create)
route.get(preFix + '/:chapId', chapController.findById)
route.put(preFix + '/:chapId', chapController.edit)
route.delete(preFix + '/:chapId', chapController.remove)

module.exports = route