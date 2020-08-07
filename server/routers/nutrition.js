const express = require('express')
const router = express.Router()
const nutritionController = require('../controllers/nutritionController.js').nutritionController

router.get('/:food', nutritionController.countNutrition)

module.exports = {router}