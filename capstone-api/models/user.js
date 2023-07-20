const { BadRequestError } = require("../utils/errors");
const pool = require('../db');

class User {
  static async getAllUsers() {
    const query = `SELECT * FROM users`;
    const result = await pool.query(query);
    const users = result.rows;
    return users;
  }

  static async getUserById(id) {
    const query = `SELECT * FROM users WHERE id = $1`;
    const result = await pool.query(query, [id]);
    const user = result.rows[0];
    return user;
  }

  static async updateUser(id, updates) {
    const { email, password, name } = updates;
    const query = `
      UPDATE users
      SET email = $1, password = $2, name = $3
      WHERE id = $4
    `;
    await pool.query(query, [email, password, name, id]);
  }

  static async deleteUser(id) {
    const query = `DELETE FROM users WHERE id = $1`;
    await pool.query(query, [id]);
  }

}

const printTableColumns = async () => {
  const tableQuery = "SELECT table_name FROM information_schema.tables WHERE table_schema = 'codepath_capstone';";
  const tablesResult = await pool.query(tableQuery);
  const tables = tablesResult.rows;

  for (let table of tables) {
    const columnQuery = `SELECT column_name FROM information_schema.columns WHERE table_name = '${table.table_name}' AND table_schema = 'codepath_capstone';`;
    const columnResult = await pool.query(columnQuery);
    const columns = columnResult.rows;
    console.log(`Table: ${table.table_name}`);
    console.log(`Columns: ${columns.map(c => c.column_name).join(', ')}`);
  }
};

module.exports = { User, printTableColumns };
