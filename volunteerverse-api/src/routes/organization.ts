/** Routes for authentication. */
import express from "express";
import { Organization } from "../models/organization"

const organizationRoutes = express.Router()

// this is a end point using the http method(post) 
// it takes in an endpoint and an async function with variables: req, res and function next
// organizationRoutes.post("/register", async function (req, res, next) {
//   try {
//     console.log("hola")
//     // this calling the register function in the Organization class
//     const organization = await Organization.register(req.body)
       // in other to receve a res from insomnia or web, ypu use res
//     //this returns the varibale response(res) sets the status to ok(201) when that happens and then sends the stuff in ()
//     return res.status(201).json({ organization })
//   } catch (err) {
//     next(err)
//   }
// })

organizationRoutes.post("/projects", async function(req,res,next){
  console.log("heyjjjjjyy")
  const {email} = req.body
  const result = await Organization.fetchAllOrganizationProjects(email)
  res.json({projects: result})
 //res.status(201).send('201')
})

console.log("hey;y")
export {organizationRoutes}
