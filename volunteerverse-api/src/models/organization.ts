import db from "../db" 
import bcrypt from "bcrypt"
import { BadRequestError, ExpressError } from "../utils/errors"

import { BCRYPT_WORK_FACTOR } from "../config"
import { log } from "console";

export class Organization {
    /**
   * Convert a user from the database into a user object that can be viewed publically.
   * Don't show user's password
   *
   *
   * @param {Organization} organization - user from database
   * @returns public organization
   */

    // static async _createNewOrganization({id, organization_name, organization_description, organization_email, logo_url}) {
     
    //   return {
    //     id: id,
    //     organization_name: organization_name,
    //     organization_description: organization_description,
    //     organization_email: organization_email,
    //    logo_url: logo_url,
    //   }
    // }


   /**
   * Authenticate user with email and password.
   *
   * Throws UnauthorizedError if user not found or wrong password.
   *
   * @returns organization
   **/
    
  // static async register(organization) {
  //   const requiredFields = ["organization_name", "organization_description", "organization_email", "logo_url"]
  //    requiredFields.forEach(field => {
  //     if(!CredentialsContainer.hasOwnProperty(field)){
  //       throw new BadRequestError(`Missing %(field) in request body `)
  //     }
  //    })
      
    
     
  //   };

  static async register(creds) {

   const existingOrganizationWithEmail = await Organization.fetchOrganizationByEmail(creds.organization_email);
    if (existingOrganizationWithEmail) {
      throw new BadRequestError(`Duplicate email: ${creds.organization_email}`);
    }

   const salt = await bcrypt.genSalt(BCRYPT_WORK_FACTOR );
   const hashedPassword = await bcrypt.hash(creds.password, salt);
   const normalizedOrgEmail = creds.organization_email.toLowerCase();

    const orgResult = await db.query (
      `INSERT INTO organizations (
        organization_name,
        organization_description,
        organization_email,
       logo_url,
       founders
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id,
      organization_name,
                organization_description,
                organization_email,
               logo_url,
               founders
               `,
    [creds.organization_name, creds.organization_description, normalizedOrgEmail, creds.logo_url, creds.founders] )
   
    const {id, organization_email, organization_name, logo_url, founders, organization_description} = orgResult.rows[0]

    const authResult = await db.query (
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
    
    [normalizedOrgEmail, hashedPassword, "organization"])

    const {user_type} = authResult.rows[0]

    // const org = {
    //   organization_name: orgResult.rows[0].organization_name,
    //   organization_description: orgResult.rows[0].organization_description,
    //   organization_email: orgResult[0].organization_email,
    //   logo_url: orgResult[0].logo_url,
    //   user_type: "organization"
    // }  
    // return orgResult.rows[0];

    return {
      id: id,
      email: organization_email,
      name: organization_name,
      description: organization_description,
      logo: logo_url,
      founders: founders,
      userType: user_type
    }
    

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
      [ org_email.toLowerCase()] // and this is assigning whatever is in the bracket to the row 
                                // in that table after we find it 
    )

    console.log("org res", org_result);

    const auth_result = await db.query(
      `SELECT 
        
        user_type
        
           FROM  authentication
           WHERE  email = $1`,
      [ org_email.toLowerCase()]
    )

    console.log("auth res", auth_result)

    if(!auth_result) {
      throw new BadRequestError()
   }
// i am returning org as an object because it has properties(babies) that make it up
    // const org = {
    //   organization_name: org_result.rows[0].organization_name,
    //   organization_description: org_result.rows[0].organization_description,
    //   organization_email: org_result[0].organization_email,
    //   logo_url: org_result[0].logo_url,
    //   user_type: "organization"
    // }  
    if (org_result){
      return org_result.rows[0]
    }
    return null
  }


  static async fetchAllOrganizationProjects(org_email){

    const result = await db.query(
// make sure this matches spelling in the table too!!
      `SELECT  
      project_name,
      project_description,
      image_url,
      requested_people,
      approved_people
       FROM projects
       WHERE  email = $1`,
       [ org_email.toLowerCase()]
       )

       if(!result) {
        throw new BadRequestError()
     }
   return result.rows
      
  }

  

  }


