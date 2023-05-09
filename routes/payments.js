const express = require('express')
const router = express.Router()
const paymentsController = require('../controllers/payment.js')

// rutas de tipo GET
router.get('/payment/success', paymentsController.getPaymentSuccess)
router.get('/payment/cancel', paymentsController.getPaymentCancel)

router.post('/create-checkout-session', paymentsController.postCheckoutSession)
router.post('/pago-completado', paymentsController.postUpdateSuscription)

module.exports = router
