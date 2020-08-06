require('dotenv').config();
const express = require('express')
const router = express.Router()
const usersRouter = require('./users.js').router
const authentication = require('../middlewares/authentication.js').authentication

const RestaurantsController = require('../controllers/restaurantsController')

router.use('/users', usersRouter)

// router.use(authentication)
router.get('/restaurants', RestaurantsController.search)

module.exports = {router}