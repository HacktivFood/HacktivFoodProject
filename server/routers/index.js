const express = require('express')
const router = express.Router()
const usersRouter = require('./users.js').router
const authentication = require('../middlewares/authentication.js').authentication
const authorization = require('../middlewares/authorization.js').authorization

router.use('/users', usersRouter)

router.use(authentication)

router.get('/', authorization, () => {
    console.log('test')
})

module.exports = {router}