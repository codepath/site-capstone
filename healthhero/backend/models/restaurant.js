const db = require("../db");
const { BadRequestError } = require("../utils/errors");

class Restaurant {
  static async listRests(userId) {
    const results = await db.query(
      `SELECT *
      FROM exercise
      WHERE exercise_id = $1;`,
      [userId]
    );
    return results.rows;
  }
  static async PostRests(exercise, userId) {
    if (exercise.name.length === 0) {
      throw new BadRequestError("No nutrient name provided");
    }

    if (exercise.category.length === 0) {
      throw new BadRequestError("No exercise category provided");
    }

    if (exercise.duration === 0) {
      throw new BadRequestError("exercise duration cannot be zero");
    }
    if (exercise.intensity === 0) {
      throw new BadRequestError("exercise intenstity cannot be zero");
    }
    const result = await db.query(
      `
            INSERT INTO exercise(
               exercise_name,
                category,
               duration,
               intensity,
               exercise_id
            )
            VALUES ($1,$2,$3,$4,$5)
            RETURNING exercise_name,category,duration, intensity, exercise_id;
            `,
      [
        exercise.name,
        exercise.category,
        exercise.duration,
        exercise.intensity,
        userId,
      ]
    );
    const ress = result.rows[0];
    return ress;
  }
}

module.exports = Exercise;
