require('dotenv').config();
const express = require('express')
const router = express.Router()
const usersRouter = require('./users.js').router
const authentication = require('../middlewares/authentication.js').authentication

const RestaurantsController = require('../controllers/restaurantsController')
const RecipeController = require('../controllers/recipeController')

router.use('/users', usersRouter)

// router.use(authentication)
router.get('/restaurants', RestaurantsController.search)
router.get('/recipes', RecipeController.getRecipe)

module.exports = {router}