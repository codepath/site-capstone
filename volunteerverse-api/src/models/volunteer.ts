import { BCRYPT_WORK_FACTOR } from "../config";
import db from "../db";
import { ExpressError, BadRequestError, UnauthorizedError } from "../utils/errors";
import { validateFields } from "../utils/validate";
import bcrypt from "bcrypt";
import { Projects } from "./projects";

export interface VolunteerProjectProp{
  id: number,
  orgName: string,
  orgDescription: string,
  orgLogoUrl: string,
  founders: string,
  orgUrl: string,
  title: string,
  description: string,
  createdAt: Date,
  imageUrl?: string,
  requestedVolunteers?: number,
  approvedVolunteers: number,
  tags: string[],
  active: boolean,
  interested: boolean,
  external: boolean,
  orgPublicEmail: string,
  orgPublicNumber?: string,
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
    const skills = await this.fetchAllVolunteerSkills(volunteer.email);
    const approvedProjects = await this.getApprovedProjects(volunteer.email);

    return {
      id: volunteer.id,
      firstName: volunteer.first_name,
      lastName: volunteer.last_name,
      email: volunteer.email,
      bio: volunteer.bio,
      imageUrl: volunteer.image_url,
      skills: skills,
      approvedProjects: approvedProjects,
      userType: "volunteer",
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
    console.log({
      id: id,
      email: email,
      firstName: firstName,
      lastName: lastName,
      imageUrl: imageUrl,
      bio: bio,
      skills: volunteerInfo.skills,
      userType: userType,
    })
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

  static async fetchAllVolunteerSkills(email: string) {
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
    // retrieve all project ids for a given user
    const query = `SELECT project_id FROM interested_volunteers WHERE email=$1`;
    const result = await db.query(query, [email]);
    // getting all interested projects
    const interestedProjects = [];
    
    for await (const {project_id} of result.rows) {
      // for each project id, retrieve the project object for a volunteer
      const project = await Projects.fetchProjectByProjectId(project_id, "volunteer", email);
      interestedProjects.push(project);
    }
    console.log("returning interseted projects: ", interestedProjects);
    return interestedProjects;
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

  // add a check to make sure that the user type IS volunteer (middleware). do the same for organization

  /**
   * When a volunteer expresses interest in a project, log it into database
   * @param projectId
   * @param email
   */
  static async expressInterest(projectId: number, email: string) {
    const volunteerCheck = await this.expressedInterest(projectId, email);
    // checks if interest is already expressed
    if (volunteerCheck) {
      throw new BadRequestError("Already expressed interest")
    }
    const volunteerCheck2 = await db.query(`SELECT * FROM volunteers WHERE email=$1`, [email]);
    // checks if volunteer does not exists
    if (volunteerCheck2.rows.length === 0) {
      throw new UnauthorizedError;
    } 

    const query = ` INSERT into interested_volunteers(email, project_id, approved) 
                    VALUES ($1,$2,$3) 
                    RETURNING 
                          email,
                          project_id as "projectId", 
                          approved`;
    const result = await db.query(query, [email, projectId, null]);
    return true ;
  }
  static async expressUninterest(projectId: number, email: string) {
    // first check if user hasn't already expressed interest
    const existingInterestedVolunteer = await db.query(
      `SELECT * FROM interested_volunteers WHERE email=$1`, [email]
    )
    if (existingInterestedVolunteer.rows > 0) {
      throw new BadRequestError("User is already not interested")
    }
    // then remove volunteer from table
    const query = ` DELETE FROM interested_volunteers
                    WHERE project_id=$1 AND email=$2`;

    const result = await db.query(query, [projectId, email]);
    return true;
  }

  /**
   * 
   * @param email 
   * @returns ranked projects based on a volunteers skills tags
   */
  static async getVolunteersProjectFeed(email: string) {

    // needs error catching to avoid server breaking (long-term: needs code refactoring)
    const projects = {}; // projects is an with id : {project} pairs to avoid duplicates
    const volunteerSkills = await this.fetchAllVolunteerSkills(email);
    console.log("getting skills for each project")
    await Promise.all(
      volunteerSkills.map(async (tag: string) => {
        const tagProjects = await Projects.getProjectsWithTag(tag, email);
        console.log(tagProjects)
        tagProjects.forEach((project) => {
          projects[project.id] = project; // updating object with new unqiue project
        });
      })
    )

    // add remaing projects to the end 
    const remainingProjects = await Projects.getAllProjects()
    console.log("found remaining Projects: ", remainingProjects);
    remainingProjects.forEach((remainingProject) => {
      if (!(remainingProject.id in projects)){
        projects[remainingProject.id] = remainingProject;
      }
    })

    // converts object into array and filters projects by active status ONLY
     console.log("projects retrieved: ", Array.from(Object.values(projects)))
    const activeOnlyProjects = Array.from(Object.values(projects)).filter((project : VolunteerProjectProp) => project.active === true)
    return activeOnlyProjects;
    //return activeOnlyProjects;

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
static async fetchProjectApproval(projectId : number, email: string){
  const query = `SELECT approved FROM interested_volunteers WHERE email=$1 AND project_id=$2`;
  const result = await db.query(query, [email, projectId]);
  if (result.rows.length > 0){
    return result.rows[0].approved
  } else{
    return false
  }
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

/**
 * returns volunteer info from the volunteers table 
 * @param email email of the volunteer
 * @returns all columns from the volunteer table
 */
static async getVolunteerByEmail(email : string){
  const query = `SELECT 
  id,
  bio,
  email,
  first_name as "firstName",
  last_name as "lastName",
  image_url as "imageUrl"

  FROM volunteers 
  WHERE email=$1`;
  const result = await db.query(query, [email]);

  console.log("fetching volunteer by email: ", result.rows)
  if (result.rows.length > 0){
    return result.rows[0];
  }
  throw new BadRequestError(`no volunteer exists with the following email: ${email}`);

}

}