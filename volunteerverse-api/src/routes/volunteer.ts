/** Routes for authentication. */
import express from "express";
import { Volunteer } from "../models/volunteer"

export const volunteerRoutes = express.Router()


volunteerRoutes.post("/register", async function (req, res, next) {
  try {
    const volunteer = await Volunteer.register(req.body)
    return res.status(201).json({ volunteer })
  } catch (err) {
    next(err)
  }
})

