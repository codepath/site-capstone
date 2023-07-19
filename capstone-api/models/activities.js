const { BadRequestError } = require("../utils/errors");

class Activities {
    static async getActivityById(activityId) {
      if (!activityId) {
        throw new BadRequestError("No activityId provided");
      }
      const query = `SELECT * FROM activities WHERE activity_id = $1`;
      const result = await db.query(query, [activityId]);
      const activity = result.rows[0];
      return activity;
    }
  
    static async addActivity(credentials) {
      const requiredFields = ["activity_id", "name", "price"];
      requiredFields.forEach((field) => {
        if (!credentials.hasOwnProperty(field)) {
          throw new BadRequestError(`Missing ${field} in request body.`);
        }
      });
  
      const query = `
        INSERT INTO activities (activity_id, name, price)
        VALUES ($1, $2, $3)
      `;
      const result = await db.query(query, [
        credentials.activity_id,
        credentials.name,
        credentials.price
      ]);
      return;
    }
  
    static async updateActivity(activityId, updates) {
      const query = `
        UPDATE activities
        SET name = $1, price = $2
        WHERE activity_id = $3
      `;
      const { name, price } = updates;
      const result = await db.query(query, [name, price, activityId]);
      return;
    }
  
    static async deleteActivity(activityId) {
      const query = `
        DELETE FROM activities
        WHERE activity_id = $1
      `;
      const result = await db.query(query, [activityId]);
      return;
    }
  }
  
  module.exports = Activities;