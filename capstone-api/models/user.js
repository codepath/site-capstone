const { BadRequestError } = require("../utils/errors");

class User {
  static async getAllUsers() {
    const query = `SELECT * FROM users`;
    const result = await db.query(query);
    const users = result.rows;
    return users;
  }

  static async getUserById(id) {
    const query = `SELECT * FROM users WHERE id = $1`;
    const result = await db.query(query, [id]);
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
    await db.query(query, [email, password, name, id]);
  }

  static async deleteUser(id) {
    const query = `DELETE FROM users WHERE id = $1`;
    await db.query(query, [id]);
  }
}

module.exports = User;
