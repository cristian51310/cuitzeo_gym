/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
const express = require('express')
const session = require('express-session')
const path = require('path')
const cors = require('cors')

const routesAuth = require('./routes/auth.js')
const routesUser = require('./routes/user.js')
const routesAdmin = require('./routes/admin.js')
const routesPayments = require('./routes/payments.js')

const errorController = require('./controllers/error.js')
const app = express()

const { PORT } = require('./config.js')

app.use(session({
  secret: 'token-secreto',
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: null, // caduca al cerrar el navegador
    httpOnly: true
  }
}))

app.use(cors())

// Indicarle al servidor donde se encuentran archivos que se van a usar
app.use('/assets', express.static(path.join(__dirname, './assets')))
app.use('/styles', express.static(path.join(__dirname, './styles')))
app.use('/stripe', express.static(path.join(__dirname, './stripe')))

// Indicarle al servidor donde se encuentran archivos que se van a usar
// Migrar a eso
// app.use('/assets', express.static(path.join(__dirname, './assets')))
// app.use('/src', express.static(path.join(__dirname, './src')))
// app.use('/server', express.static(path.join(__dirname, './server')))

// Indicar que estamos usando EJS
app.set('view engine', 'ejs')

// Indecar el modo de transferir datos
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Aqui estan las rutas referentes a la autenticacion
app.use(routesAuth)

// Aqui estan las rutas referentes a los usuarios
app.use(routesUser)

// Aqui estan las rutas referentes a los administradores
app.use(routesAdmin)

// Aqui estan las rutas referentes a las compras realizadas y canceladas
app.use(routesPayments)

// Landing Page
app.get('/landing', (req, res, next) => {
  res.render('landing')
})

// Explicacion
app.get('/', (req, res) => {
  console.log(req.session.loggedin)
  if (req.session.loggedin === true) {
    res.redirect('/routines')
  } else {
    res.redirect('/login')
  }
})

// Con esto resolvemos el 404
app.use(errorController.getError)

// Puerto donde se estara usando el servidor
app.listen(PORT)
