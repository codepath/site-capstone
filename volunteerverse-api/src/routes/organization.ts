/** Routes for authentication. */
import express from "express";
import { Organization } from "../models/organization"

const organizationRoutes = express.Router()


//make get? request that returns information from database
organizationRoutes.get("/projects", async function(req,res,next){
  // const org_id = parseInt(req.params.org_id)
  const{id} = res.locals.user
  const result = await Organization.fetchAllOrganizationProjectsById(id)
  if (result) {
  res.status(201).json({orgProjects: result})
      } else {
      res.status(404).json( { error: 'Project not found' } )
    }
 
})

/**route that returns project information given the project id */
// projectRoutes.get("/:projectId", async function (req, res, next){
//   const projectId = parseInt(req.params.projectId)
//   const project = await Projects.fetchProjectByProjectId(projectId)
//   if (project) {
//       res.status(201).json(project)
//     } else {
//       res.status(404).json( { error: 'Project not found' } )
//     }
// })

//make post request that stores organization's projects in database
// organizationRoutes.post("/project/create", async function(req,res,next){
//   const {projectInfo} = req.body
//   console.log("project info: ", projectInfo)
//   const result = await Organization.createOrganizationProject(projectInfo)
//   res.json({projectInfo: result})
// })

// organizationRoutes.post("/project/update", async function(req,res,next){
//   try{
//   const {approved, email, project_id, org_id} = req.body
//   const result = await Organization.updateApprovedVolunteers(approved, email, project_id, org_id)
//   console.log("updateApproved" ,result)
//   res.json({approvedVolunteer: result})
//   }catch (error) {
//     next(error);
//   }
 
// })

organizationRoutes.put("/project/status/:projectId", async function(req,res,next){
  try{
    const { id } = res.locals.user
    const projectId = parseInt(req.params.projectId)
    const result = await Organization.toggleStateOfOrgProject(projectId, id)
    res.json({active : result})
  }catch (error) {
    next(error);
  }
})
organizationRoutes.put("/project/:projectId", async function(req,res,next){
  console.log('whyy')
  try{
    const projectId = parseInt(req.params.projectId)
    const { id } = res.locals.user
    const { email, initial } = req.body
  const result = await Organization.incrementAndDecrementApprovedVolunteers(email, projectId, id, initial)
  console.log("updateApproved" ,result)
  res.json({approved: result})
  }catch (error) {
    next(error);
  }
 
})



organizationRoutes.delete("/project/:projectId", async function(req,res,next){
  const { id } = res.locals.user
  const projectId = parseInt(req.params.projectId)
  console.log("project id: ", projectId)
  const result = await Organization.deleteOrganizationProject(projectId, id)
  res.json({deleteProject: result})
})



organizationRoutes.get("/project/interested/:projectId", async function (req, res, next) {
       //req.body is what we put in insomnia when we test which to equate to what we put in the browser
       //that then goes into the function below 
       const projectId = parseInt(req.params.projectId)
  console.log("this is the req.body", req.params.projectId);
const result = await Organization.fetchInterestedVolunteersByProjectId(projectId);
  if (result) {
    res.status(201).json({ interestedVolunteers: result })
  } else {
    res.status(404).json( { error: 'Project not found' } )
  }
});
organizationRoutes.get("/project/interested/count/:projectId", async function (req, res, next) {
       //req.body is what we put in insomnia when we test which to equate to what we put in the browser
       //that then goes into the function below 
       const projectId = parseInt(req.params.projectId)
  console.log("this is the req.body", req.params.projectId);
const result = await Organization.fetchInterestedVolunteersByProjectId(projectId);
  if (result) {
    res.status(201).json({ count: result.length })
  } else {
    res.status(404).json( { error: 'Project not found' } )
  }
});



export {organizationRoutes}
