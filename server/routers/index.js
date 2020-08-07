const express = require('express')
const router = express.Router()
const usersRouter = require('./users.js').router
const nutritionRouter = require('./nutrition.js').router
const authentication = require('../middlewares/authentication.js').authentication

router.use('/users', usersRouter)

router.use(authentication)

router.use('/nutrition', nutritionRouter)

module.exports = {router}