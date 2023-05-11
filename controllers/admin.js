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

  const MAILGUN_DOMAIN = 'sandboxd9301b5bff6945be948cb055f6703fb0.mailgun.org'
  const MAILGUN_API = '3e1cc322bb54682227eb5aac1fee1fa3-6b161b0a-9e4738de'

  const mailgun = require('mailgun-js')({
    apiKey: MAILGUN_API,
    domain: MAILGUN_DOMAIN
  })

  const data = {
    from: 'Remitente <cristian.figueroa.crfe@gmail.com>',
    to: email,
    subject: asunto,
    html: cuerpo
  }

  console.log(data)

  mailgun.messages().send(data, (error, body) => {
    res.redirect('/admin/dashboard')
  })
}
