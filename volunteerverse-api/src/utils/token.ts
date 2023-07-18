import jwt from "jsonwebtoken"
import { SECRET_KEY } from "../config"
import { validateFields } from "./validate"

export const generateToken = (data: any) => {
    const token = jwt.sign(data, SECRET_KEY);
    return token;
  }


export const createUserJwt = (user : {id:number, email:string, user_type?:string}) => {
    validateFields({required:["id", "email"], obj:user, location:"token generation"})

    const payload = {id:user.id, email:user.email}

    return generateToken(payload)

}

export const validateToken = (token) => {
    try{
        const decoded = jwt.verify(token, SECRET_KEY)
        return decoded
    } catch (error){
        return {}
    }
}