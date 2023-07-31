
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
        console.log("user: ", user)
        
        if (user){
            const {userType} = user
            const isValid = await bcrypt.compare(creds.password, user.password)
            if (isValid===true){
                if (userType==="volunteer"){
                    const volunteer = await Volunteer.fetchVolunteerByEmail(creds.email)
                    return await Volunteer.createPublicVolunteer(volunteer)
                }
                if (userType==="organization"){
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
            return {
                id: user.id,
                email: user.email,
                password: user.password,
                userType: user.user_type,
            }
        }
        return null
    }
}