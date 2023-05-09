const bd = require('../database/database')

module.exports = class Usuario {
  constructor (idUsuario, nombre, apellidoPaterno, apellidoMaterno, email, password) {
    this.idUsuario = idUsuario
    this.nombre = nombre
    this.apellidoPaterno = apellidoPaterno
    this.apellidoMaterno = apellidoMaterno
    this.email = email
    this.password = password
  }

  guardar () {
    return bd.execute(
      'INSERT INTO Usuario (nombre, apellido_paterno, apellido_materno, email, password) VALUES (?, ?, ?, ?, ?)',
      [this.nombre, this.apellidoPaterno, this.apellidoMaterno, this.email, this.password]
    )
  }

  // Mostrar usuario especificos por id
  static mostrarUsuarioPorId (id) {
    return bd.execute('SELECT * FROM Usuario WHERE id_usuario = ?', [id])
  }

  // Mostrar todos los usuarios
  static mostrarUsuarios () {
    return bd.execute('SELECT * FROM Usuario WHERE id_rol = 1')
  }

  // Mostrar usuario especifico por email
  static mostrarUsuarioPorEmail (email) {
    return bd.execute('SELECT * FROM Usuario WHERE email = ?', [email])
  }

  // Actualizar suscripcion del usuario
  static actualizarSuscripcion (idUsuario) {
    return bd.execute('UPDATE Usuario SET id_suscripcion = 2 WHERE id_usuario = ?', [idUsuario])
  }
}
