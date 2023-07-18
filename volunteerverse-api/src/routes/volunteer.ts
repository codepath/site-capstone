/** Routes for authentication. */
import express from "express";
import { Volunteer } from "../models/volunteer"

const volunteerRoutes = express.Router()

volunteerRoutes.get("/test", async function (req, res, next) {
  res.send("test voluteer")
})

volunteerRoutes.post("/skills", async function(req,res,next){
  const {email} = req.body
  const result = await Volunteer.fetchAllSkills(email)
  res.json({skills: result})
})



export {volunteerRoutes}