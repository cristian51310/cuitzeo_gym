const mysql = require('mysql2')
const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD, DB_PORT } = require('../config.js')

const pool = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME
})

module.exports = pool.promise()
