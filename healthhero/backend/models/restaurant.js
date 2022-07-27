const db = require("../db");
const { BadRequestError } = require("../utils/errors");

class Restaurant {
  static async listRests(userId) {
    const results = await db.query(
      `SELECT *
      FROM restaurant
      WHERE user_id = $1;`,
      [userId]
    );
    return results.rows;
  }
  static async PostRests(restaurant, userId) {
    if (restaurant.name.length === 0) {
      throw new BadRequestError("No restaurant name provided");
    }

    if (restaurant.location.length === 0) {
      throw new BadRequestError("No restaurant location provided");
    }

    if (restaurant.image_url === 0) {
      throw new BadRequestError("Restaurant image cannot be zero");
    }
    if (restaurant.description.length === 0) {
      throw new BadRequestError("Restaurant description cannot be zero");
    }
    const result = await db.query(
      `
            INSERT INTO restaurant(
               name,
               location,
               image_url,
               description,
           user_id)
            VALUES ($1,$2,$3,$4,$5)
            RETURNING name,location,image_url, description, user_id;
            `,
      [
        restaurant.name,
        restaurant.location,
        restaurant.image_url,
        restaurant.description,
        userId,
      ]
    );
    const results = result.rows[0];
    return results;
  }
}

module.exports = Restaurant;
