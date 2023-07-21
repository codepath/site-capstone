/** Routes for authentication. */
import express from "express";
import { Organization } from "../models/organization"

const organizationRoutes = express.Router()


organizationRoutes.post("/projects", async function(req,res,next){
  const {email} = req.body
  const result = await Organization.fetchAllOrganizationProjects(email)
  res.json({projects: result})
 
})

export {organizationRoutes}
