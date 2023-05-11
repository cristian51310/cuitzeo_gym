/* eslint-disable camelcase */
const nodemailer = require('nodemailer')
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

  const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com', // hostname
    secureConnection: true,
    tls: {
      ciphers: 'SSLv3'
    },
    port: 587,
    auth: {
      user: 'cristiancrfe@outlook.com',
      pass: 'mi_nombre'
    }
  })

  const mailOptions = {
    from: 'cristiancrfe@outlook.com',
    to: email,
    subject: asunto,
    text: cuerpo
  }

  const info = await transporter.sendMail(mailOptions)

  console.log(info)

  res.redirect('/admin/dashboard')
}
