/** Routes for authentication. */
import express from "express";
import { Volunteer } from "../models/volunteer"

const volunteerRoutes = express.Router()

volunteerRoutes.get("/test", async function (req, res, next) {
  res.send("test voluteer")
})


volunteerRoutes.post("/register", async function (req, res, next) {
  try {
    console.log("heyyy")
    const volunteer = await Volunteer.register(req.body)
    return res.status(201).json({ volunteer })
  } catch (err) {
    next(err)
  }
})

export {volunteerRoutes}