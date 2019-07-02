const { Router } = require('express')
const authRouter = require('./auth.router')
const adminRouter = require('./admin/')
const guessRouter = require('./guess/')
const { auth } = require('../middlewares/auth.middleware')

const router = Router()
router.use('/auth', authRouter)
router.use('/admin', [auth], adminRouter)
router.use('/guess', guessRouter)

module.exports = router