import db from "../db";
import bcrypt from "bcrypt";
import {
  BadRequestError,
  ExpressError,
  UnauthorizedError,
} from "../utils/errors";

import { BCRYPT_WORK_FACTOR } from "../config";

export class Organization {
  /**
   * Convert a user from the database into a user object that can be viewed publically.
   * Don't show user's password
   *
   *
   * @param {Organization} organization - user from database
   * @returns public organization
   */

  static async register(creds) {
    const existingOrganizationWithEmail =
      await Organization.fetchOrganizationByEmail(creds.organization_email);
    if (existingOrganizationWithEmail) {
      throw new BadRequestError(`Duplicate email: ${creds.organization_email}`);
    }

    const salt = await bcrypt.genSalt(BCRYPT_WORK_FACTOR);
    const hashedPassword = await bcrypt.hash(creds.password, salt);
    const normalizedOrgEmail = creds.organization_email.toLowerCase();

    const orgResult = await db.query(
      `INSERT INTO organizations (
        organization_name,
        organization_description,
        organization_email,
       logo_url,
       founders,
       website
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id,
      organization_name,
                organization_description,
                organization_email,
               logo_url,
               founders,
               website
               `,
      [
        creds.organization_name,
        creds.organization_description,
        normalizedOrgEmail,
        creds.logo_url,
        creds.founders,
        creds.website,
      ]
    );

    const {
      id,
      organization_email,
      organization_name,
      logo_url,
      founders,
      organization_description,
      website,
    } = orgResult.rows[0];

    const authResult = await db.query(
      `INSERT INTO authentication (
        email,
        password,
        user_type
      )
      VALUES ($1, $2, $3)
      RETURNING  
      email,
      password,
      user_type
      `,

      [normalizedOrgEmail, hashedPassword, "organization"]
    );

    const { user_type } = authResult.rows[0];

    return {
      id: id,
      email: organization_email,
      name: organization_name,
      description: organization_description,
      logo: logo_url,
      founders: founders,
      userType: user_type,
      website: website,
    };
  }
  static async fetchInterestedVolunteersByEmail(email) {
    const interestedVolunteersInfo = await db.query(
      `SELECT 
      id,
      email,
      project_id,
      approved
         FROM interested_volunteers
         WHERE  email = $1`,
      [email.toLowerCase()]
    );

    if (interestedVolunteersInfo) {
      return interestedVolunteersInfo.rows;
    }
    return null;
  }

  static async fetchOrganizationByEmail(org_email: string) {
    // this is querying the organization table, going through the rows to find the
    // item(that is access it) in the bracket(email in this case)
    const org_result = await db.query(
      `SELECT 
        organization_name,
        organization_description,
        organization_email,
        logo_url,
        founders
           FROM organizations
           WHERE  organization_email = $1`, // this does to filtering to make sure we are being
      // specific to the item in the bracket we are looking for
      // by checking if the item we passed in is equal to the row info already
      // in the table
      [org_email.toLowerCase()] // and this is assigning whatever is in the bracket to the row
      // in that table after we find it
    );

    console.log("org res", org_result);

    const auth_result = await db.query(
      `SELECT 
        
        user_type
        
           FROM  authentication
           WHERE  email = $1`,
      [org_email.toLowerCase()]
    );

    console.log("auth res", auth_result);

    if (!auth_result) {
      throw new BadRequestError();
    }

    if (org_result) {
      return org_result.rows[0];
    }
    return null;
  }

  // static async createOrganizationProject (projectInfo) {
  //   console.log("project info in create function: ", projectInfo)
  // const result = await db.query(
  //   `INSERT INTO projects(
  //     org_id,
  //     project_name,
  //     project_description,
  //     image_url,
  //     requested_people,
  //     approved_people)
  //   VALUES ($1, $2, $3, $4, $5, $6)

  //    RETURNING  org_id, project_name, project_description, image_url, requested_people, approved_people`,
  //   [projectInfo.org_id , projectInfo.project_name,projectInfo.project_description,projectInfo.image_url,projectInfo.requested_people,projectInfo.approved_people])

  //   return result.rows[0]
  // }

  static async deleteOrganizationProject(project_id, orgId) {
    const orgResult = await db.query(
      `SELECT * FROM projects WHERE org_id = $1 AND id = $2`,
      [orgId, project_id]
    );
    if (orgResult.rows[0] !== 0) {
      const result = await db.query(`DELETE FROM "projects" WHERE "id" = $1`, [
        project_id,
      ]);
      return true;
    } else {
      return new UnauthorizedError("Organization/Project not found");
    }
  }

  static async updateApprovedVolunteers(approved, email, project_id, org_id) {
    //returns all the volunteers interested in the project
    const interestedVolunteersInfo =
      await Organization.fetchInterestedVolunteersByEmail(email);

    const orgResult = await db.query(
      `SELECT * FROM projects WHERE org_id = $1 AND id = $2`,
      [org_id, project_id]
    );
    console.log("the info under the projectid and orgid", orgResult.rows);

    if (interestedVolunteersInfo.length !== 0) {
      console.log(
        "the info of the volunteer if they exist",
        interestedVolunteersInfo
      );

      if (orgResult.rows.length !== 0) {
        const result = await db.query(
          `UPDATE "interested_volunteers" SET "approved" = $1 
                     WHERE "email" = $2 AND "project_id" = $3
                     RETURNING *`,
          [!approved, email, project_id]
        );
        return result.rows;
      } else {
        return new UnauthorizedError("Organization/Project not found");
      }
    } else {
      return new UnauthorizedError("Volunteer Email not found");
    }
  }

  static async fetchAllOrganizationProjectsById(org_id) {
    const result = await db.query(
      // make sure this matches spelling in the table too!!
      `SELECT 
      org_id, 
      project_name,
      project_description,
      image_url,
      requested_people,
      approved_people
       FROM projects
       WHERE  org_id = $1`,
      [org_id]
    );

    if (!result) {
      throw new BadRequestError();
    }
    return result.rows;
  }

  static async fetchInterestedVolunteersByProjectId(projectId) {
    const result = await db.query(
      // make sure this matches spelling in the table too!!
      // if this was insert, we would have assigned the data from insomnia
      //to it but since it is select, we would be taking the data under the rows from
      //the table we said
      `SELECT  
      email,
      project_id
       FROM interested_volunteers
       WHERE  project_id = $1`,
      [projectId]
      // then project_id will then equal what we put in and then using that we can filter
      // what we want from the table!
      //which we then assign to result back in the route and then convert to json.
    );

    if (!result) {
      throw new BadRequestError();
    }
    return result.rows;
  }

  static async getOrgById(orgId: number) {
    const query = `SELECT * FROM organizations WHERE id=$1`;
    const result = await db.query(query, [orgId]);
    const org = result.rows[0];
    if (org) {
      return org;
    }
    return null;
  }
}
