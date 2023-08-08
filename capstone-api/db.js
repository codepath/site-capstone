const { Pool } = require('pg');
const { getDatabaseUri } = require('./config');
require('dotenv').config();

const pool = new Pool({
  connectionString: `postgres://nomadia_db_user:ZzvYi2rnw40muzcdGVeTHTR7HtCCjyvb@dpg-cj8ki9cl975s738h521g-a.oregon-postgres.render.com/nomadia_db?sslmode=require`
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
  
  // Call the testConnection function
  testConnection();

module.exports = pool;
