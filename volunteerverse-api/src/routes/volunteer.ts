/** Routes for authentication. */
import express from "express";
import { Volunteer } from "../models/volunteer"

const volunteerRoutes = express.Router()

volunteerRoutes.get("/test", async function (req, res, next) {
  res.send("test voluteer")
})



export {volunteerRoutes}