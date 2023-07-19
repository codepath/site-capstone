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


/**route that returns project information given the project id */
projectRoutes.get("/:projectId", async function (req, res, next){
    const projectId = parseInt(req.params.projectId)
    const project = await Projects.fetchProjectByProjectId(projectId)
    if (project) {
        res.status(201).json(project)
      } else {
        res.status(404).json( { error: 'Project not found' } )
      }
})