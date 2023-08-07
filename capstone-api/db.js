const { Pool } = require('pg');
const { getDatabaseUri } = require('./config');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function testConnection() {
    try {
      const client = await pool.connect();
      console.log('Connection established successfully!');
      client.release(); // Release the client back to the pool after testing the connection
    } catch (err) {
      console.error('Error connecting to the database:', err);
    }
  }
  ZzvYi2rnw40muzcdGVeTHTR7HtCCjyvb
  
  // Call the testConnection function
  testConnection();

module.exports = pool;
