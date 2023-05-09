const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.js')

// rutas de tipo GET
router.get('/login', authController.getLogin)
router.get('/logout', authController.logout)

// rutas de tipo POST
router.post('/register', authController.postRegister)
router.post('/login', authController.postLogin)

module.exports = router
