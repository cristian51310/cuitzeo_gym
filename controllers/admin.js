/* eslint-disable n/handle-callback-err */
/* eslint-disable camelcase */
const Usuario = require('../models/usuarios')

/****************************************************************/
/*           Obtener pagina principal del dashboard             */
/****************************************************************/

exports.getDashboard = (req, res, next) => {
  if (req.session.loggedin === true) {
    Usuario.mostrarUsuarios().then(([filas, campos]) => {
      res.render('admin/dashboard', {
        usuarios: filas
      })
    })
  } else {
    res.redirect('/login')
  }
}

/****************************************************************/
/*           Obtener el correo del usuario por el id            */
/****************************************************************/

exports.getCorreoUsuario = (req, res, next) => {
  if (req.session.loggedin === true) {
    const id_usuario = req.params.id_usuario
    Usuario.mostrarUsuarioPorId(id_usuario)
      .then(([filas, campos]) => {
        res.render('admin/sendemail', {
          usuarios: filas
        })
      })
  } else {
    res.redirect('/login')
  }
}

/****************************************************************/
/*          Funcion para enviar correos a los usuarios          */
/****************************************************************/
/****************************************************************/
/* 1.- recuperamos los datos del formulario de envio            */
/* 2.- utilizamos la libreria nodemailer para enviar el correo  */
/****************************************************************/

exports.postEnviarEmail = async (req, res, next) => {
  const email = req.body.email
  const asunto = req.body.asunto
  const cuerpo = req.body.cuerpo

  const MAILGUN_DOMAIN = 'sandboxed8a40b80e9c494fb8fd008b60be6db8.mailgun.org'
  const MAILGUN_API = '53c62d052fd1907eda7be54c2098f71a-db4df449-5a89278d'

  const mailgun = require('mailgun-js')({
    apiKey: MAILGUN_API,
    domain: MAILGUN_DOMAIN
  })

  const data = {
    from: 'Remitente <avilesalexa003@gmail.com>',
    to: email,
    subject: asunto,
    html: cuerpo
  }

  mailgun.messages().send(data, (error, body) => {
    if (error) {
      console.log(error)
      res.redirect('/admin/dashboard')
    } else {
      res.redirect('/admin/dashboard')
    }
  })
}
