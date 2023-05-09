/* eslint-disable camelcase */
const stripe = require('stripe')('sk_test_51N31fdCCkGcV1au1cJCPLvqUx5UkLyOGk2MFlSTYB1mAqbt2PMbG46tvrU9Nq3U9zNfm3gg5lwVg7G3LyGHMi7XD00gwRrsQRY')
const Usuario = require('../models/usuarios.js')
const { DOMAIN } = require('../config.js')

/****************************************************************/
/*                Mandar a la pagina del checkout               */
/****************************************************************/

exports.postCheckoutSession = async (req, res, next) => {
  const data = req.body
  // const prod_id = data.prod_id
  const price_id = data.price_id

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: price_id,
        quantity: 1
      }
    ],
    mode: 'subscription',
    success_url: `${DOMAIN}/payment/success`,
    cancel_url: `${DOMAIN}/payment/cancel`
  })

  res.redirect(303, session.url)
}

/****************************************************************/
/*               Obtener pagina de pago completado              */
/****************************************************************/

exports.getPaymentSuccess = (req, res, next) => {
  if (req.session.loggedin === true) {
    const id_usuario = req.session.id_usuario
    res.render('payments/success', {
      pageTitle: 'pagoExitoso',
      id_usuario
    })
  } else {
    res.redirect('/')
  }
}

/****************************************************************/
/*               Obtener pagina de pago rechazado               */
/****************************************************************/

exports.getPaymentCancel = (req, res, next) => {
  if (req.session.loggedin === true) {
    res.render('payments/cancel', {
      pageTitle: 'pagoCancelado'
    })
  } else {
    res.redirect('/')
  }
}

/****************************************************************/
/*     Regresar a pagina principal despues de pago exitoso      */
/****************************************************************/

exports.postUpdateSuscription = (req, res, next) => {
  const data = req.body
  console.log(data)
  const id_usuario = data.id_usuario

  Usuario.actualizarSuscripcion(id_usuario)
    .then(() => {
      res.redirect('/routines')
    })
    .catch(err => { console.log(err) })
}
