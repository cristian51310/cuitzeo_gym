const express = require('express')
const router = express.Router()
const adminController = require('../controllers/admin.js')

// rutas de tipo GET
router.get('/admin/dashboard', adminController.getDashboard)
router.get('/admin/dashboard/send/:id_usuario', adminController.getCorreoUsuario)

router.post('/enviar-email', adminController.postEnviarEmail)

module.exports = router
