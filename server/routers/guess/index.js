const { Router } = require('express')
const storyRouter = require('./story.router')
const contentRouter = require('./content.router')
const categoryRouter = require('./category.router')
const userRouter = require('./user.router')

const router = Router()
router.use('/stories', storyRouter)
router.use('/contents', contentRouter)
router.use('/categories', categoryRouter)
router.use('/users', userRouter)

module.exports = router
