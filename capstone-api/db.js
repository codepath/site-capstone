// const { Pool } = require('pg')
// require('dotenv').config()

// const pool = new Pool({
//     connectionString: process.env.DB_HOSTED_URL
// })


// module.exports = pool

const { Client } = require("pg");
const { getDatabaseUri } = require("./config");

require("colors");

const db = new Client({ connectionString: getDatabaseUri() });

db.connect((err) => {
    if (err) {
        console.error("connection error".red, err.stack);
    } else {
        console.log("Successfully connected to PostgreSQL database!".blue);
    }
});

module.exports = db;