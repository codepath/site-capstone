/** Routes for authentication. */

import express from "express"
import { Volunteer } from "../models/volunteer"
import { Organization } from "../models/organization"
import { createUserJwt } from "../utils/token"
import { Auth } from "../models/auth"
import {requireAuthenticatedUser} from "../middleware/security"


export const authRoutes = express.Router()


authRoutes.post("/register", async function(req, res, next){
    console.log('eday')
    try {
        const {userType} = req.body
        console.log(userType)
        if (userType=="volunteer"){
            const volunteer = await Volunteer.register(req.body)
            const token = createUserJwt(volunteer)
            console.log(token)
            console.log('edayy')
            return res.status(201).json({user: volunteer, token: token})
        }
        else if (userType=="organization"){
            const organization = await Organization.register(req.body)
            const token = createUserJwt(organization)
            return res.status(201).json({user: organization, token: token})
        }
    } catch (error) {
        next(error)
    }
})

authRoutes.post("/login", async function( req, res, next){
    try{
        const {email, password} = req.body
        const user = await Auth.authenticate({email:email, password:password})

        if(user){
            const token = createUserJwt(user)
            return res.status(201).json({user, token})
        }
        
    } catch (error){
        next(error)
    }

})


authRoutes.get("/me", requireAuthenticatedUser, async (request, response, next) => {
    // request header should contain auth token
    try {
        const { user } = response.locals;
        console.log("retrieved: ", user)
        if (user) {
            response.status(200).json({ user: user });
        } else{
            console.log("no user found from repsonse locals: ", response.locals)
            next();
        }
    } catch (error) {
        console.log("unexpected error occured: ", error)
        next(error)
    }
});


