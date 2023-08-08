/** Routes for authentication. */
import express from "express";
import { Volunteer } from "../models/volunteer";
import { BadRequestError } from "../utils/errors";

const volunteerRoutes = express.Router();

/** Route that fetches all the skills for the logged in volunteer */
volunteerRoutes.get("/skills", async function (req, res, next) {
  const { email } = res.locals.user;
  try {
    const result = await Volunteer.fetchAllVolunteerSkills(email);
    res.status(200).json({skills: result});
  } catch (error) {
    next(error);
  }
});

/** Route that handles when a volunteer expresses interest in a project - adds it to database */
volunteerRoutes.put("/interest/:projectId", async function (req, res, next) {
  try {
    const projectId = parseInt(req.params.projectId);
    const {email, userType } = res.locals.user;
    const { mode } = req.body;
    if (mode === undefined) throw new BadRequestError("No mode found in request body")
    console.log("EMAIL VALUE IN VOLUNTEER: ", email);
    console.log("request body: ", req.body)
    if (mode === "add"){
      console.log("adding interest")
      const result = await Volunteer.expressInterest(projectId, email);
      res.status(200).json(result);
      
    }else if (mode === "remove"){
      console.log("removing interest")
      const result = await Volunteer.expressUninterest(projectId, email);
      res.status(200).json(result);
    }
  } catch (error) {
    next(error);
  }
});

/** Route that returns the project feed for a volunteer */
volunteerRoutes.get("/projects", async function (req, res, next) {
  const { email } = res.locals.user;
 
  try{
    const result = await Volunteer.getVolunteersProjectFeed(email);
    res.status(200).json(result)
  } catch (error){
    console.log("sending error")
    next (error)
  }
});
/** Route that returns the project feed for a volunteer */
volunteerRoutes.get("/projects/interested", async function (req, res, next) {
  const { email } = res.locals.user;
  try{
    const result = await Volunteer.getInterestedProjects(email);
    res.status(200).json(result)
  } catch (error){
    console.log("sending error")
    next (error)
  }
});

export { volunteerRoutes };
