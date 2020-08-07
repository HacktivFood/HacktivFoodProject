const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController.js').userController

router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/googleSignIn', userController.googleSignIn)

module.exports = {router}