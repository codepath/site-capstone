import db from "../db"
import { validateFields } from "../utils/validate"
import bcrypt from "bcrypt"
import { UnauthorizedError } from "../utils/errors"

export class Auth{


    static async authenticate(creds: {email:string, password:string}){
        const requiredCreds = ["email", "password"]
        try{
            validateFields({required:requiredCreds, obj:creds, location:"user authentication"})
        } catch(error) {
            throw error
        }

        const user = await this.fetchByEmail(creds.email)

        if (user){
            const isValid = await bcrypt.compare(creds.password, user.password)
            if (isValid===true){
                return user
            }
        }
        throw new UnauthorizedError("Invalid username/password")    
    }



    static async fetchByEmail(email:string){
        const query = `SELECT * FROM authentication WHERE email=$1`
        const result = await db.query(query, [email])
        const user = result.rows[0]
        if (user){
            return user
        }
        return null
    }
}