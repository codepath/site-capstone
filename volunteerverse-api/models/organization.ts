"use strict";

const db = require("../db");
const bcrypt = require ("bcrypt")
const { BadRequestError, UnauthorizedError } = require("../utils/errors");

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
  static async register(organization) {
    return {
        
            
            }
          
     
    };
  }





module.exports = Organization