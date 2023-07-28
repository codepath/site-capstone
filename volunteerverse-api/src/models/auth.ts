
import  db  from "../db"
import { validateFields } from "../utils/validate"
import bcrypt from "bcrypt"
import { UnauthorizedError } from "../utils/errors"
import { Volunteer } from "./volunteer"
import { Organization } from "./organization"

export class Auth{


    static async authenticate(creds: {email:string, password:string}){
        const requiredCreds = ["email", "password"]
        console.log("authenticate", requiredCreds)
        try{
            validateFields({required:requiredCreds, obj:creds, location:"user authentication"})
        } catch(error) {
            throw error
        }

        const user = await this.fetchByEmail(creds.email)
        console.log(user.rows)
        const {user_type} = user

        if (user){
            const isValid = await bcrypt.compare(creds.password, user.password)
            if (isValid===true){
                if (user_type==="volunteer"){
                    const volunteer = await Volunteer.fetchVolunteerByEmail(creds.email)
                    return await Volunteer.createPublicVolunteer(volunteer)
                }
                if (user_type==="organization"){
                    return Organization.fetchOrganizationByEmail(creds.email)
                }
            }
        }
        throw new UnauthorizedError("Invalid username/password")    
    }



    static async fetchByEmail(email:string){
        const query = `SELECT * FROM authentication WHERE email=$1`
        const result = await db.query(query, [email])
        const user = result.rows[0]
        console.log(user)
        if (user){
            
            return user
        }
        return null
    }
}