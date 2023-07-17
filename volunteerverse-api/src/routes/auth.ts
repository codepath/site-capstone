/** Routes for authentication. */

import express from "express"
import { Volunteer } from "../models/volunteer"
import { Organization } from "../../models/organization"
import { createUserJwt } from "../utils/token"

export const authRoutes = express.Router()


authRoutes.post("/register", async function(req, res, next){
    console.log("hi")
    try {
        const {userType} = req.body
        console.log(userType)
        if (userType==="volunteer"){
            const volunteer = await Volunteer.register(req.body)
            const token = createUserJwt(volunteer)
            console.log(token)
            return res.status(201).json({user: volunteer, token: token})
        }
        else if (userType=="organization"){
            const organization = await Organization.register(req.body)
            const token = "placeholder"//createUserJwt(organization)
            return res.status(201).json({user: organization, token: token})
        }
    } catch (error) {
        next(error)

    }

})

