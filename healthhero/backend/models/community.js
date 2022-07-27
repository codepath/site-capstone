const db = require("../db");
const { BadRequestError } = require("../utils/errors");

class Community {
  static async listCommunity(userId) {
    const results = await db.query(
      `SELECT *
      FROM community 
      WHERE user_id = $1;`,
      [userId]
    );
    return results.rows;
  }
  static async PostCommunity(community, userId) {
    console.log(userId);
    if (community.name.length === 0) {
      throw new BadRequestError("No community name provided");
    }

    if (community.image_url === 0) {
      throw new BadRequestError("No community image provdid");
    }
    if (community.description.length === 0) {
      throw new BadRequestError("Comunnity description cannot be zero");
    }
    const result = await db.query(
      `
            INSERT INTO community(
               name,
               image_url,
               description,
               user_id
            )
            VALUES ($1,$2,$3,$4)
            RETURNING name,image_url, description, user_id;
            `,
      [community.name, community.image_url, community.description, userId]
    );
    const results = result.rows[0];
    return results;
  }
}

module.exports = Community;
