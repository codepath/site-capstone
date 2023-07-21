/** Routes for authentication. */
import express from "express";
import { Organization } from "../models/organization"

const organizationRoutes = express.Router()


organizationRoutes.post("/projects", async function(req,res,next){
  const {email} = req.body
  const result = await Organization.fetchAllOrganizationProjects(email)
  res.json({projects: result})
 
})

organizationRoutes.post("/projects/interested", async function (req, res, next) {
       //req.body is what we put in insomnia when we test which to equate to what we put in the browser
       //that then goes into the function below 
  const { projectId } = req.body;
  console.log("this is the req.body", req.body);
const result = await Organization.fetchInterestedVolunteersByProjectId(projectId);
  res.json({ interested_students: result });
});


export {organizationRoutes}
