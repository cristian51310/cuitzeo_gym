const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.js')

// rutas de tipo GET
router.get('/routines', userController.getRoutines)
router.get('/machines', userController.getMachines)
router.get('/profile', userController.getProfile)
router.get('/tiers', userController.getTiers)

// rutas de tipo POST
router.post('/guardar-perfil', userController.postProfile)
router.post('/actualizar-perfil', userController.postUpdateProfile)

module.exports = router
