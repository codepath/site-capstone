import jwt from "jsonwebtoken"
import { SECRET_KEY } from "../config"
import { validateFields } from "./validate"

export const generateToken = (data: any) => {
    const token = jwt.sign(data, SECRET_KEY);
    return token;
  }


export const createUserJwt = (user) => {
    validateFields({required:["id", "email", "userType"], obj:user, location:"token generation"})

    const payload = {id:user.id, email:user.email, userType: user.userType}
    console.log(payload)

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