const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
    connectionString: process.env.DB_HOSTED_URL
})


module.exports = pool