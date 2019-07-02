const { Router } = require('express')
const storyRouter = require('./story.router')
const contentRouter = require('./content.router')
const categoryRouter = require('./category.router')

const router = Router()
router.use('/stories', storyRouter)
router.use('/contents', contentRouter)
router.use('/categories', categoryRouter)

module.exports = router
