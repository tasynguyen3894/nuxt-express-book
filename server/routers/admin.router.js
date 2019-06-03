const { Router } = require('express')
const storyRouter = require('./admin/story.router')
const contentRouter = require('./admin/content.router')
const categoryRouter = require('./admin/category.router')

const router = Router()
router.use('/stories', storyRouter)
router.use('/contents', contentRouter)
router.use('/categories', categoryRouter)

module.exports = router
