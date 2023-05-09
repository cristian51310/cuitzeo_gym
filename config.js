const PORT = process.env.PORT || 3001
const DOMAIN = process.env.DOMAIN || 'http://localhost:3001'
const DB_HOST = process.env.DB_HOST || 'localhost'
const DB_PORT = process.env.DB_PORT || 3306
const DB_NAME = process.env.DB_NAME || 'cuitzeo_gym'
const DB_USER = process.env.DB_USER || 'root'
const DB_PASSWORD = process.env.DB_PASSWORD || 'crfe2608'

module.exports = {
  PORT,
  DOMAIN,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASSWORD
}
