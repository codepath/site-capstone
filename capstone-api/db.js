const { Pool } = require('pg');
const { getDatabaseUri } = require('./config');
require('dotenv').config();

const pool = new Pool({
  connectionString: getDatabaseUri(),
});

module.exports = pool;
