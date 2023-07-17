"use strict";

const db = require("../db");
const bcrypt = require ("bcrypt")
const { BadRequestError, UnauthorizedError } = require("../utils/errors");

const { BCRYPT_WORK_FACTOR } = require("../config");

export class Organization {
    /**
   * Convert a user from the database into a user object that can be viewed publically.
   * Don't show user's password
   *
   *
   * @param {Organization} organization - user from database
   * @returns public organization
   */
  static async register(organization) {
    return {
        
            
            }
          
     

    };
  }





module.exports = Organization"use strict";

const db = require("../db");
const bcrypt = require ("bcrypt")
const { BadRequestError, ExpressError } = require("../utils/errors");

const { BCRYPT_WORK_FACTOR } = require("../config");

class Organization {
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

  static async registerOrg(creds) {
   const { organization_name, organization_description, organization_email, logo_url, password } = creds;

   const existingOrganizationWithEmail = await Organization.fetchOrganizationByEmail(organization_email);
    if (existingOrganizationWithEmail) {
      throw new BadRequestError(`Duplicate email: ${organization_email}`);
    }

   const salt = await bcrypt.genSalt(BCRYPT_WORK_FACTOR );
   const hashedPassword = await bcrypt.hash(password, salt);
   const normalizedOrgEmail = organization_email.toLowerCase();

    const orgResult = await db.query (
      `INSERT INTO organizations (
        organization_name,
        organization_description,
        organization_email,
       logo_url
      )
      VALUES ($1, $2, $3, $4)
      RETURNING organization_name,
                organization_description,
                organization_email,
               logo_url 
               `,
    [organization_name, organization_description, normalizedOrgEmail , logo_url] )
   

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

    const org = {
      organization_name: orgResult.rows[0].organization_name,
      organization_description: orgResult.rows[0].organization_description,
      organization_email: orgResult[0].organization_email,
      logo_url: orgResult[0].logo_url,
      user_type: "organization"
    }  
    return org;
    

  }

    

  static async fetchOrganizationByEmail(org_email: string) {
    // this is querying the organization table, going through the rows to find the
    // item(that is access it) in the bracket(email in this case) 
    const org_result = await db.query(
      `SELECT 
        organization_name,
        organization_description,
        organization_email,
        logo_url
           FROM organizations
           WHERE  organization_email = $1`,
      [ org_email.toLowerCase()] // and this is assigning whatever is in the bracket to the row 
                                // in that table after we find it 
    )

    const auth_result = await db.query(
      `SELECT 
        
        user_type
        
           FROM  authentication
           WHERE  email = $1`,
      [ org_email.toLowerCase()]
    )

    const org = {
      organization_name: org_result.rows[0].organization_name,
      organization_description: org_result.rows[0].organization_description,
      organization_email: org_result[0].organization_email,
      logo_url: org_result[0].logo_url,
      user_type: "organization"
    }  
    return org;
  }

  static async fetchAllOrganizationProjects(id){

    const result = await db.query(
      `SELECT *    
       FROM organizations`)
    
    return result.rows;
  }

  

  }


module.exports = Organization