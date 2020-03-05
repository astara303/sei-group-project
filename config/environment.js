const env = process.env.NODE_ENV || 'development'
const port = process.env.PORT || 4000
const dbURI = process.env.MONGOD_DB || `mongodb://localhost/trail-cache-api-${env}`
const secret = process.env.SECRET || 'oh my gosh I want to know'

module.exports = { port, dbURI, secret }