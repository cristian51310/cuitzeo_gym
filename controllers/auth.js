/* eslint-disable n/handle-callback-err */
const Usuario = require('../models/usuarios')
const bcrypt = require('bcrypt')

/****************************************************************/
/*                     Obtener pagina de login                  */
/****************************************************************/

exports.getLogin = (req, res, next) => {
  res.render('auth/login')
}

/****************************************************************/
/*    Validar el inicio de sesion con los datos que se envian   */
/****************************************************************/
/****************************************************************/
/* 1.- pedimos los datos del formulario de login                */
/* 2.- buscamos los usuarios conforme al email ingresado        */
/* 3.- si no se encontro el usuario no hacemos nada             */
/* 4.- si se encontro comparamos las contraseñas                */
/* 5.- si las contraseñas no coinciden no iniciamos sesion      */
/* 6.- si las contraseñas coinciden iniciamos una session       */
/****************************************************************/

exports.postLogin = (req, res, next) => {
  const data = req.body

  Usuario.mostrarUsuarioPorEmail(data.email).then(([filas, campos]) => {
    if (filas === null || filas.length === 0) {
      // no se encontro el correo
      res.redirect('/login')
    } else {
      bcrypt.compare(data.password, filas[0].password, (err, isMatch) => {
        if (!isMatch) {
          // contraseña incorrecta
          res.redirect('/login')
        } else {
          // todo correcto
          // verificamos si el usuario es admin o no
          req.session.loggedin = true
          req.session.name = filas[0].nombre
          req.session.id_usuario = filas[0].id_usuario

          if (filas[0].id_rol === 1) {
            // usuario
            res.redirect('/routines')
          } else if (filas[0].id_rol === 2) {
            // admin
            res.redirect('/admin/dashboard')
          }
        }
      })
    }
  })
}

/****************************************************************/
/*                  Funcion para cerrar la sesion               */
/****************************************************************/
/****************************************************************/
/* 1.- destruimos la sesion                                     */
/* 2.- redireccionamos a la pagina de login                     */
/****************************************************************/

exports.logout = (req, res) => {
  req.session.destroy()
  res.redirect('/login')
  console.log('Sesion cerrada exitosamente')
}

/****************************************************************/
/*                  Funcion para crear usuarios                 */
/****************************************************************/
/****************************************************************/
/* 1.- pedimos los datos del formulario de registro             */
/* 2.- encriptamos la contraseña                                */
/* 3.- guardamos los datos en la BD                             */
/* 4.- redireccionamos a la pagina de login                     */
/****************************************************************/

exports.postRegister = (req, res, next) => {
  const data = req.body
  bcrypt.hash(data.password, 12).then(hash => {
    data.password = hash
    const usuario = new Usuario(null, data.nombre, data.apellidoPaterno, data.apellidoMaterno, data.email, data.password)
    usuario.guardar()
      .then(() => { res.redirect('/login') })
      .catch(err => console.log(err))
  })
}
