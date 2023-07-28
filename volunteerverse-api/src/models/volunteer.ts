import { BCRYPT_WORK_FACTOR } from "../config";
import db from "../db";
import { ExpressError, BadRequestError } from "../utils/errors";
import { validateFields } from "../utils/validate";
import bcrypt from "bcrypt";
import { Projects } from "./projects";

interface VolunteerInterface{

}

export class Volunteer {

  // Static method to make a volunteer object
  static async createPublicVolunteer(volunteer: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    bio: string;
    image_url: string;
  }) {
    const skills = await this.fetchAllSkills(volunteer.email);
    const interestedProjects = await this.getInterestedProjects(
      volunteer.email
    );
    const approvedProjects = await this.getApprovedProjects(volunteer.email);

    return {
      id: volunteer.id,
      firstName: volunteer.first_name,
      lastName: volunteer.last_name,
      email: volunteer.email,
      bio: volunteer.bio,
      imageUrl: volunteer.image_url,
      skills: skills,
      interestedProjects: interestedProjects,
      approvedProjects: approvedProjects,
      userType: "volunteer",
    };
  }



  //interface??? could be useful to define types

  /**
   * Register volunteer with their information in the database
   * @param volunteerInfo
   */
  static async register(volunteerInfo: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    imageUrl?: string;
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
      "userType",
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
    if (existingVolunteer != null) {
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
      bio,
      image_url
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id,
                  email,            
                  first_name AS "firstName", 
                  last_name AS "lastName",
                  bio,
                  image_url as "imageUrl"`;

    const result = await db.query(query, [
      normalizedEmail,
      volunteerInfo.firstName,
      volunteerInfo.lastName,
      volunteerInfo.bio,
      volunteerInfo.imageUrl || null,
    ]);

    const { id, email, firstName, lastName, bio, imageUrl } = result.rows[0];

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
      imageUrl: imageUrl,
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
   * Gets all the skills logged for the volunteer
   * @param email
   */

  static async fetchAllSkills(email: string) {
    const query = `SELECT skill FROM volunteer_skills WHERE email=$1`;
    const result = await db.query(query, [email]);
    const skills = [];
    result.rows.forEach((row) => {
      skills.push(row.skill);
    });
    return skills;
  }

  /**
   * Get all the projects the volunteer has applied for or expressed interest in
   * @param email
   * @returns
   */

  static async getInterestedProjects(email: string) {
    const query = `SELECT project_id FROM interested_volunteers WHERE email=$1 and approved=$2`;
    const result = await db.query(query, [email, false]);
    if (result) {
      return result.rows;
    }
  }

  /**
   * Get all the currently approved projects for a specific student
   * @param email
   * @returns
   */

  static async getApprovedProjects(email: string) {
    const query = `SELECT project_id FROM interested_volunteers WHERE email=$1 AND approved=TRUE`;
    const result = await db.query(query, [email]);

    if (result) {
      return result.rows;
    }
    return null;
  }

  /**
   * Fetch a volunteer in the database by email
   * @param email
   * @returns volunteer if found, null if not
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
   * When a volunteer expresses interest in a project, log it into database
   * @param projectId
   * @param email
   */
  static async expressInterest(projectId: number, email: string) {
    const volunteerCheck = await this.expressedInterest(projectId, email)
    if (volunteerCheck){
      throw new BadRequestError("Already expressed interest")
    }

    const query = `INSERT into interested_volunteers(email, project_id, approved) VALUES ($1,$2,$3) RETURNING email,project_id as "projectId",approved`;
    const result = await db.query(query, [email, projectId, false]);
    return result.rows[0];
  }

  static async getVolunteersProjectFeed(email: string) {
    const projects = new Set<any>();

    const volunteerSkills = await this.fetchAllSkills(email);
    await Promise.all(
      volunteerSkills.map(async (tag: string) => {
        const tagProjects = await Projects.getProjectsWithTag(tag);
        tagProjects.forEach((project) => {
          projects.add(project); // Use add() to add unique project objects to the Set
        });
      })
    );
    return Array.from(projects);
  }




/**
 * Returns a boolean indicating whether a volunteer has expressed interest in a specific project
 * @param projectId 
 * @param email 
 * @returns boolean
 */
static async expressedInterest(projectId:number, email:string){
  const query = `SELECT * FROM interested_volunteers WHERE email=$1 AND project_id=$2`;
  const result = await db.query(query, [email, projectId]);
  if (result.rows[0]){
    return true;
  }
  return false;
}

/**
 * Returns a boolean indicating whether a volunteer was approved for a specific project
 * @param projectId 
 * @param email 
 * @returns boolean
 * @throws BadRequestError
 */

static async checkStatusProject(projectId:number, email:string){
  const query = `SELECT * FROM interested_volunteers WHERE email=$1 AND project_id=$2`;
  const result = await db.query(query, [email, projectId]);
  if (result.rows[0]){
    return result.rows[0].approved;
  }
  throw new BadRequestError(`${email} has not expressed interest in project ${projectId}`);

}






}