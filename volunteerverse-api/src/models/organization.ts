import db from "../db";
import bcrypt from "bcrypt";
import {
  BadRequestError,
  ExpressError,
  UnauthorizedError,
} from "../utils/errors";

import { BCRYPT_WORK_FACTOR } from "../config";
import { Volunteer } from "./volunteer";
import { validateFields } from "../utils/validate";
/**
 * @todo: change get org by email function or refactor
 */
export class Organization {
  /**
   * Convert a user from the database into a user object that can be viewed publically.
   * Don't show user's password
   *
   *
   * @param {Organization} organization - user from database
   * @returns public organization
   */


  static async register(creds: {
    email: string;
    password: string;
    orgName: string;
    founders: string;
    orgDescription: string;
    logoUrl: string;
    orgWebsite: string;
    publicNumber: string;
    publicEmail: string;
    userType: string;
  })
  {
    const requiredInfo = [
      "orgName",
      "orgDescription",
      "email",
      "logoUrl",
      "userType",
     "password",
     "founders",
    "publicEmail",
    ];
    try {
      validateFields({
        required: requiredInfo,
        obj: creds,
        location: "org registration",
      });
    } catch (error) {
      throw error;
    }

    const existingOrganizationWithEmail =
      await Organization.fetchOrganizationByEmail(creds.email);
    if (existingOrganizationWithEmail) {
      throw new BadRequestError(`Duplicate email: ${creds.email}`);
    }

    const salt = await bcrypt.genSalt(BCRYPT_WORK_FACTOR);
    const hashedPassword = await bcrypt.hash(creds.password, salt);
    const normalizedOrgEmail = creds.email.toLowerCase().trim();
    const orgResult = await db.query(
      `INSERT INTO organizations (
        organization_name,
        organization_description,
        organization_email,
       logo_url,
       founders,
       website,
       public_number, 
       public_email
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id,
      organization_name,
                organization_description,
                organization_email,
               logo_url,
               founders,
               website,
               public_number,
               public_email
               `,
      [
        creds.orgName,
        creds.orgDescription,
        normalizedOrgEmail,
        creds.logoUrl,
        creds.founders,
        creds.orgWebsite,
        creds.publicNumber,
        creds.publicEmail,
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
      public_email,
      public_number,
    } = orgResult.rows[0];
    console.log(orgResult.rows[0], organization_name)
    
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
      orgName: organization_name,
      orgDescription: organization_description,
      logoUrl: logo_url,
      founders: founders,
      userType: user_type,
      orgWebsite: website,
      publicEmail: public_email,
      publciNUmber: public_number,
    };
  }
  static async fetchInterestedVolunteersByEmail(email) {
    // returns volunteer info based on email
    const interestedVolunteersInfo = await db.query(
      `SELECT *
         FROM interested_volunteers
         WHERE  email = $1`,
      [email.toLowerCase()]
    );

    return interestedVolunteersInfo.rows[0]
  }

  static async fetchOrganizationByEmail(org_email: string) {
    // this is querying the organization table, going through the rows to find the
    // item(that is access it) in the bracket(email in this case)
    const org_result = await db.query(
      `SELECT
        id,
        organization_name AS "orgName",
        organization_description AS "orgDesc",
        organization_email AS "email",
        logo_url AS "imageUrl",
        founders,
        public_email AS "publicName",
        public_number AS "publicNumber"
        FROM organizations
        WHERE  organization_email = $1`, 
        // this does to filtering to make sure we are being
      // specific to the item in the bracket we are looking for
      // by checking if the item we passed in is equal to the row info already
      // in the table
      [org_email.toLowerCase()] // and this is assigning whatever is in the bracket to the row
      // in that table after we find it
    );

    console.log("org res", org_result.rows);

    const auth_result = await db.query(
      `SELECT 
        
        user_type as "userType"
        
           FROM  authentication
           WHERE  email = $1`,
      [org_email.toLowerCase()]
    );

    console.log("auth res", auth_result.rows[0]);

    if (org_result.rows.length) {
      console.log("returning org user: ", { ...org_result.rows[0], userType: "organization" })
      return { ...org_result.rows[0], userType: "organization" };
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
  static async toggleStateOfOrgProject(projectId, orgId) {

    const activeResult = await db.query(`SELECT active FROM projects
    WHERE id = $1 `,
      [projectId])

    console.log("active result", activeResult.rows[0].active)

    const orgResult = await db.query(
      `SELECT * FROM projects WHERE org_id = $1 AND id = $2`,
      [orgId, projectId]
    )
    if (orgResult.rows.length !== 0) {
      const result = await db.query(
        `UPDATE "projects" SET "active" = $1 
                   WHERE "id" = $2 AND "org_id" = $3
                   RETURNING *`,
        [!activeResult.rows[0].active, projectId, orgId]
      );
      return result.rows[0].active;
    } else {
      throw new UnauthorizedError("Organization/Project not found");
    }
  }

  static async deleteOrganizationProject(project_id, orgId) {
    const orgResult = await db.query(
      `SELECT * FROM projects WHERE org_id = $1 AND id = $2`,
      [orgId, project_id]
    );
    if (orgResult.rows.length !== 0) {
      // deletes project from table
      await db.query(`DELETE FROM "projects" WHERE "id" = $1`, [project_id]);
      // deletes project from project_tags
      await db.query(`DELETE FROM "project_tags" WHERE "project_id"=$1`, [project_id]);
      // deletes projects from interested_volunteers table
      await db.query(`DELETE FROM "interested_volunteers" WHERE "project_id"=$1`, [project_id]);

      return true;
    } else {
      throw new UnauthorizedError("Organization does not have access, or project not found");
    }
  }

  static async updateApprovedVolunteers(approved, email, project_id, org_id, initial_approval_state) {
    // to check if the volunteer exist(if this does interestedVoluteersInfo will be populated)
    const interestedVolunteersInfo =
      await this.fetchInterestedVolunteersByEmail(email);

    // to check if the project and( / for the )org exists if it does orgResult will be populated
    const orgResult = await db.query(
      `SELECT * FROM projects WHERE org_id = $1 AND id = $2`,
      [org_id, project_id]
    );
    console.log("orgResult is here", orgResult);
    // to check if the volunteer exist
    if (interestedVolunteersInfo.length !== 0) {
      console.log(
        "the info of the volunteer if they exist",
        interestedVolunteersInfo
      );

      // to check if the project and( / for the )org exists 
      if (orgResult.rows.length !== 0) {
        // handles setting initial approval state and toggling given approval state
        const approvalState = approved === null ? initial_approval_state : !approved
        const result = await db.query(
          `UPDATE "interested_volunteers" SET "approved" = $1 
                     WHERE "email" = $2 AND "project_id" = $3
                     RETURNING *`,
          [approvalState, email, project_id]

        );
        console.log("updating approved works!", result.rows)

        return result.rows[0];

      } else {
        throw new UnauthorizedError("Organization/Project not found");
      }
    } else {
      throw new UnauthorizedError("Volunteer Email not found");
    }

  }

  static async incrementAndDecrementApprovedVolunteers(email, projectId, orgId, initialApprovalState) {
    const approvedResult = await db.query(`SELECT approved FROM interested_volunteers 
                              WHERE project_id = $1 AND email = $2`,
      [projectId, email])

    const approvedPeopleResult = await db.query(`SELECT approved_people FROM projects
                               WHERE id = $1 AND org_id = $2`,
      [projectId, orgId])


    console.log("approvedResult", approvedResult.rows[0])
    console.log("approvedPeopleResult", approvedPeopleResult.rows[0])

    const approvedVolunteerState = await this.updateApprovedVolunteers(approvedResult.rows[0].approved, email, projectId, orgId, initialApprovalState)

    console.log("bringing volunteer state into incre/decre works!", approvedVolunteerState.approved)

    console.log("approvedPeopleohhhhhh", approvedPeopleResult.rows[0].approved_people)
    if (approvedVolunteerState.approved === true) {

      console.log("here works!", approvedVolunteerState.approved)
      const result = await db.query(
        `UPDATE "projects" SET "approved_people" = $1 
         WHERE "org_id" = $2 AND "id" = $3
         RETURNING *`,
        [approvedPeopleResult.rows[0].approved_people + 1, orgId, projectId]

      );
      console.log(" the if in incre/decre works!", approvedVolunteerState.approved)
      return approvedVolunteerState.approved;

    } else if (approvedVolunteerState.approved === false) {
      // reset number of approved back to 0 if number becomes negative
      let numberOfApproved = approvedPeopleResult.rows[0].approved_people;
      numberOfApproved = numberOfApproved < 0 ? 0 : numberOfApproved;

      console.log("approved is false", typeof approvedPeopleResult.rows[0].approved_people)
      const result = await db.query(
        `UPDATE "projects" SET "approved_people" = $1 
            WHERE "org_id" = $2 AND "id" = $3
            RETURNING *`,
        [numberOfApproved, orgId, projectId]

      );
      return approvedVolunteerState.approved;

    } else {
      throw new BadRequestError("Volunteer increment/decrement failed");
    }
  }



  static async fetchAllOrganizationProjectsById(org_id) {
    const result = await db.query(
      // make sure this matches spelling in the table too!!
      `SELECT 
       id,
       org_id AS "orgId", 
       project_name AS "title",
       project_description AS "description",
       image_url as "imageUrl",
       requested_people as "requestedPeople",
       approved_people as "approvedPeople",
       created_at as "createdAt",
       active
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
      email, approved
       FROM interested_volunteers
       WHERE  project_id = $1`,
      [projectId]
      // then project_id will then equal what we put in and then using that we can filter
      // what we want from the table!
      //which we then assign to result back in the route and then convert to json.
    );

    const interestedVolunteers = []
    for await (const volunteerInfo of result.rows) {
      // for each volunteer, we add an additional approved field
      try{
        const volunteer = await Volunteer.getVolunteerByEmail(volunteerInfo.email);
        console.log("retrieved volunteer: ", volunteer)
        volunteer["approved"] = volunteerInfo.approved;
        interestedVolunteers.push(volunteer)
      } catch(error){
        throw error;
      }
    }
    return interestedVolunteers;
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
