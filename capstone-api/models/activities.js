const { BadRequestError } = require("../utils/errors");
const db = require("../db"); // Assuming you have set up the database connection in "db.js"

class Activities {
  static async getActivityById(activityId) {
    if (!activityId) {
      throw new BadRequestError("No activityId provided");
    }
    const query = `SELECT * FROM activities WHERE id = $1`;
    const result = await db.query(query, [activityId]);
    const activity = result.rows[0];
    return activity;
  }

  static async addActivity(credentials) {
    const requiredFields = ["name", "price", "city", "check_in", "check_out"];
    requiredFields.forEach((field) => {
      if (!credentials.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body.`);
      }
    });

    const query = `
      INSERT INTO activities (name, price, city, check_in, check_out)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const values = [
      credentials.name,
      credentials.price,
      credentials.city,
      credentials.check_in,
      credentials.check_out,
    ];

    const result = await db.query(query, values);
    return result.rows[0];
  }

  static async updateActivity(activityId, updates) {
    const query = `
      UPDATE activities
      SET name = $1, price = $2, city = $3, check_in = $4, check_out = $5
      WHERE id = $6
      RETURNING *
    `;
    const { name, price, city, check_in, check_out } = updates;
    const values = [name, price, city, check_in, check_out, activityId];

    const result = await db.query(query, values);
    return result.rows[0];
  }

  static async deleteActivity(activityId) {
    const query = `
      DELETE FROM activities
      WHERE id = $1
      RETURNING *
    `;
    const result = await db.query(query, [activityId]);
    return result.rows[0];
  }
}

module.exports = Activities;
