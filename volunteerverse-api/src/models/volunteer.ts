import { BCRYPT_WORK_FACTOR } from "../config";
import { db } from "../db";
import { ExpressError, BadRequestError } from "../utils/errors";
import { validateFields } from "../utils/validate";
import bcrypt from "bcrypt";

export class Volunteer {
  /**
   * Convert a volunteer from the database into a volunteer object that can be viewed publically.
   * @param {Volunteer} volunteer - user from database
   * @returns public volunteer info
   */
  static _createPublicUser(volunteer) {
    return {
      id: volunteer.id,
      firstName: volunteer.firstName,
      lastName: volunteer.lastName,
      email: volunteer.email,
      bio: volunteer.bio,
      skills: volunteer.skills,
      userType: volunteer.userType,
    };
  }

  /**
   * Register volunteer with their information in the database
   * @param volunteerInfo
   */
  static async register(volunteerInfo: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    bio: string;
    skills: string[];
    userType: string;
  }) {
    const requiredInfo = [
      "email",
      "password",
      "firstName",
      "lastName",
      "bio",
      "skills",
      "userType"
    ];
    try {
      validateFields({
        required: requiredInfo,
        obj: volunteerInfo,
        location: "user registration",
      });
    } catch (error) {
      throw error;
    }

    const existingVolunteer = await this.fetchVolunteerByEmail(
      volunteerInfo.email
    );
    if (existingVolunteer) {
      throw new BadRequestError(`Duplicate email: ${volunteerInfo.email}`);
    }

    const hashedPassword = await bcrypt.hash(
      volunteerInfo.password,
      BCRYPT_WORK_FACTOR
    );
    const normalizedEmail = volunteerInfo.email.toLowerCase();

    const query = `INSERT INTO volunteers(
      email,
      first_name,
      last_name,
      bio
    )
    VALUES ($1, $2, $3, $4)
    RETURNING id,
                  email,            
                  first_name AS "firstName", 
                  last_name AS "lastName",
                  bio`;

    const result = await db.query(query, [
      normalizedEmail,
      volunteerInfo.firstName,
      volunteerInfo.lastName,
      volunteerInfo.bio,
    ]);

    const { id, email, firstName, lastName, bio } = result.rows[0];

    const queryPassword = `INSERT into authentication (email, password, user_type) 
    VALUES($1, $2, $3) RETURNING id, email, password,user_type as "userType"`;

    const passwordResult = await db.query(queryPassword, [
      normalizedEmail,
      hashedPassword,
      volunteerInfo.userType,
    ]);

    const { userType } = passwordResult.rows[0];

    volunteerInfo.skills.forEach((skill) => {
      this.insertSkill(volunteerInfo.email, skill);
    });

    return {
      id: id,
      email: email,
      firstName: firstName,
      lastName: lastName,
      bio: bio,
      skills: volunteerInfo.skills,
      userType: userType,
    };
  }

  /**
   * Adds a skill corresponding with the volunteer in the volunteer_skills database
   */

  static async insertSkill(emailInput: string, skillInput: string) {
    const query = `INSERT into volunteer_skills(email, skill) VALUES ($1, $2) RETURNING *`;
    const result = await db.query(query, [emailInput, skillInput]);
  }

  /**
   * Fetch a volunteer in the database by email
   * @param email
   */

  static async fetchVolunteerByEmail(email: string) {
    const query = `SELECT * FROM volunteers WHERE email=$1`;
    const result = await db.query(query, [email]);
    const volunteer = result.rows[0];

    if (volunteer) {
      return volunteer;
    }
    return null;
  }


  /**
   * 
   */
}
