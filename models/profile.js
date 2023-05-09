/* eslint-disable camelcase */
const bd = require('../database/database')

module.exports = class Perfil {
  constructor (idPerfil, idUsuario, edad, peso, estatura, idObjetivo) {
    this.idPerfil = idPerfil
    this.idUsuario = idUsuario
    this.edad = edad
    this.peso = peso
    this.estatura = estatura
    this.idObjetivo = idObjetivo
  }

  guardar () {
    return bd.execute(
      'INSERT INTO Perfil (id_usuario, edad, peso, estatura, id_objetivo) VALUES (?, ?, ?, ?, ?)',
      [this.idUsuario, this.edad, this.peso, this.estatura, this.idObjetivo]
    )
  }

  // Obtener perfil por el id del usuario
  static mostrarPerfilPorUsuario (id_usuario) {
    return bd.execute('SELECT * FROM Perfil WHERE id_usuario = ?', [id_usuario])
  }

  // Actualizar perfil por el id usario
  static actualizarPerfilPorUsuario (id_usuario, edad, peso, estatura, id_objetivo) {
    return bd.execute(
      'UPDATE Perfil SET edad = ?, peso = ?, estatura = ?, id_objetivo = ? WHERE id_usuario = ?',
      [edad, peso, estatura, id_objetivo, id_usuario]
    )
  }
}
