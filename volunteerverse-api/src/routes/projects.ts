/** Routes for the project model */

import express from "express";
import { Projects } from "../models/projects";

export const projectRoutes = express.Router()


projectRoutes.post("/register", async function (req, res, next){
    try{
        const project = await Projects.registerProject(req.body)
        return res.status(201).json(project)
    } catch (error){
        next(error)
    }
})