import jwt from "jsonwebtoken"
import { SECRET_KEY } from "../config"
import { validateFields } from "./validate"

export interface VolunteerUserProp{
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    imageUrl: string,
    bio: string,
    skills: string[],
    userType: "volunteer",
}
export interface OrgUserProp{
    id: number,
    email: string,
    orgName: string,
    orgDescription: string,
    logoUrl: string,
    founders: string,
    userType: "organization",
    orgWebsite: string,
}

export const generateToken = (data: any) => {
    const token = jwt.sign(data, SECRET_KEY);
    return token;
  }

export const createUserJwt = (user : VolunteerUserProp | OrgUserProp) => {
    validateFields({required:["id", "email", "userType"], obj:user, location:"token generation"})
    console.log(user)
    return generateToken(user)
}

export const validateToken = (token) => {
    try{
        const decoded = jwt.verify(token, SECRET_KEY)
        return decoded
    } catch (error){
        return {}
    }
}