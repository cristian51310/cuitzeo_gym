/* eslint-disable camelcase */
const Maquina = require('../models/machines')
const Perfil = require('../models/profile')
const Usuario = require('../models/usuarios')

/*
En todas las funciones de tipo GET estamos pidiendo una pagina al servidor
pero primero siempre se haran una serie de validaciones

1. Verificar si el usuario esta logeado o no
2. Verificar que tipo de suscripcion tiene el usuario
3. Verificar si el usuario tiene un perfil para gym o no

* Si el usuario no esta logeado, se redirecciona a la pagina de login
* Si el usuario tiene una suscripcion gratuita, se redirecciona a la pagina de suscripciones
  para que pueda comprar una
* Si el usuario no tiene un perfil para gym, se redirecciona a la pagina de perfil
  para que pueda crear uno
*/

// se que posiblemente haya una mejor manera de hacer todo esto pero por el momento
// solo copiare y pegare el codigo por cada funcion de tipo get

/****************************************************************/
/*                   Obtener pagina de rutinas                  */
/****************************************************************/

exports.getRoutines = (req, res, next) => {
  // Verificar si el usuario esta logeado
  if (req.session.loggedin === true) {
    Usuario.mostrarUsuarioPorId(req.session.id_usuario)
      .then(([filas, datos]) => {
        const suscripcionActiva = filas[0].id_suscripcion
        // Verificar si el usuario tiene una suscripcion gratuita
        if (suscripcionActiva === 1) {
          // Suscripcion gratuita
          res.redirect('/tiers')
        } else {
          // Suscripcion de paga
          // Verificar si el usuario tiene un perfil para gym
          Perfil.mostrarPerfilPorUsuario(req.session.id_usuario)
            .then(([filas, datos]) => {
              if (filas.length === 0) {
                // El usuario no tiene un perfil para gym
                res.redirect('/profile')
              } else {
                // El usuario tiene un perfil para gym

                // dependiendo de cual id_objetivo tenga el usuario
                // se mostraran las rutinas correspondientes a su objetivo
                if (filas[0].id_objetivo === 1) {
                  res.render('user/routines', {
                    pageTitle: 'rutinas',
                    name: req.session.name
                  })
                } else if (filas[0].id_objetivo === 2) {
                  res.render('user/routines2', {
                    pageTitle: 'rutinas',
                    name: req.session.name
                  })
                } else if (filas[0].id_objetivo === 3) {
                  res.render('user/routines3', {
                    pageTitle: 'rutinas',
                    name: req.session.name
                  })
                } else if (filas[0].id_objetivo === 4) {
                  res.render('user/routines4', {
                    pageTitle: 'rutinas',
                    name: req.session.name
                  })
                } else if (filas[0].id_objetivo === 5) {
                  res.render('user/routines5', {
                    pageTitle: 'rutinas',
                    name: req.session.name
                  })
                }
              }
            })
        }
      })
  } else {
    res.redirect('/')
  }
}

/****************************************************************/
/*                  Obtener pagina de tu perfil                 */
/****************************************************************/

exports.getProfile = (req, res, next) => {
  if (req.session.loggedin === true) {
    Usuario.mostrarUsuarioPorId(req.session.id_usuario)
      .then(([filas, datos]) => {
        const suscripcionActiva = filas[0].id_suscripcion
        // Verificar si el usuario tiene una suscripcion gratuita
        if (suscripcionActiva === 1) {
          // Suscripcion gratuita
          res.redirect('/tiers')
        } else {
          // Suscripcion de paga

          // Verificar si el usuario tiene un perfil para gym
          // Si tiene lo editara y si no lo tiene lo creara
          Perfil.mostrarPerfilPorUsuario(req.session.id_usuario)
            .then(([filas, datos]) => {
              if (filas.length === 0) {
                // El usuario no tiene un perfil para gym
                res.render('user/profile', {
                  pageTitle: 'perfil',
                  name: req.session.name
                })
              } else {
                // El usuario tiene un perfil para gym y lo editara
                res.render('user/edit-profile', {
                  pageTitle: 'perfil',
                  name: req.session.name,
                  perfil: filas[0]
                })
              }
            })
        }
      })
  } else {
    res.redirect('/')
  }
}

/****************************************************************/
/*          Obtener pagina de Niveles de suscripcion            */
/****************************************************************/

exports.getTiers = (req, res, next) => {
  if (req.session.loggedin === true) {
    res.render('user/tiers', {
      pageTitle: 'niveles',
      name: req.session.name
    })
  } else {
    res.redirect('/')
  }
}

/****************************************************************/
/*                   Obtener pagina de maquinas                 */
/****************************************************************/

exports.getMachines = (req, res, next) => {
  if (req.session.loggedin === true) {
    Maquina.mostrarMaquinas()
      .then(([filas, datos]) => {
        res.render('user/machines', {
          pageTitle: 'maquinas',
          name: req.session.name,
          maquinas: filas
        })
      })
      .catch(err => console.log(err))
  } else {
    res.redirect('/')
  }
}

/****************************************************************/
/*                       Guardar tu perfil                      */
/****************************************************************/

exports.postProfile = (req, res, next) => {
  const data = req.body
  const id_usuario = req.session.id_usuario

  const perfil = new Perfil(
    null,
    id_usuario,
    parseInt(data.edad),
    parseInt(data.peso),
    parseInt(data.estatura),
    data.objetivo
  )

  console.log(perfil)

  perfil.guardar()
    .then(() => {
      res.redirect('/routines')
    })
    .catch(err => console.log(err))
}

/****************************************************************/
/*                        Editar tu perfil                      */
/****************************************************************/

exports.postUpdateProfile = (req, res, next) => {
  const data = req.body
  const id_usuario = req.session.id_usuario
  console.log(data)

  Perfil.actualizarPerfilPorUsuario(
    id_usuario,
    parseInt(data.edad),
    parseInt(data.peso),
    parseInt(data.estatura),
    parseInt(data.objetivo)
  )
    .then(() => {
      res.redirect('/routines')
    })
    .catch(err => console.log(err))
}
