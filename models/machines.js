/* eslint-disable camelcase */
const bd = require('../database/database')

module.exports = class Maquina {
  constructor (id_maquina, nombre, descripcion, imagen) {
    this.id_maquina = id_maquina
    this.nombre = nombre
    this.descripcion = descripcion
    this.imagen = imagen
  }

  // Mostrar todas las maquinas
  static mostrarMaquinas () {
    return bd.execute('SELECT * FROM Maquina')
  }
}
