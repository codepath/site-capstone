/** Routes for the project model */

import express from "express";
import { Projects } from "../models/projects";
import { requireAuthenticatedUser } from "../middleware/security";


export const projectRoutes = express.Router();




projectRoutes.post("/register", async function (req, res, next){
    try{
      const {id} = res.locals.user
        const project = await Projects.registerProject({...req.body, orgId: id})
        return res.status(201).json(project)
    } catch (error){
        next(error)
    }
})




/**route that returns project information given the project id */
projectRoutes.get(
  "/:projectId",
  requireAuthenticatedUser,
  async function (req, res, next) {
    const projectId = parseInt(req.params.projectId);
    const { user_type, email } = res.locals.user;
    console.log("USERTYPE", user_type);
    try {
      const project = await Projects.fetchProjectByProjectId(
        projectId,
        user_type,
        email
      );
      res.status(201).json(project);
    } catch (error) {
      next(error);
    }
  }
);

/**route that gets all projects with given tag */
projectRoutes.get(
  "/tag/:tag_name",
  requireAuthenticatedUser,
  async function (req, res, next) {
    const tag = req.params.tag_name;
    const { user_type, email } = res.locals.user;
    const projects = await Projects.getProjectsWithTag(tag);
    if (projects) {
      res.status(201).json({ projects: projects });
    } else {
      res.status(404).json({ error: "Projects with given tag not found" });
    }
  }
);

/**route that handles searching by a term */
projectRoutes.get(
  "/search/:searchTerm",
  requireAuthenticatedUser,
  async function (req, res, next) {
    const search = req.params.searchTerm;
    try {
      const projects = await Projects.searchProjects(search);
      res.status(201).json(projects);
    } catch (error) {
      next(error);
    }
  }
);

/** route that gets all the project tags in database */
projectRoutes.get("/tags", async function (req, res, next) {
  try {
    const tags = await Projects.getAllProjectTags();
    res.status(201).json({ tags: tags });
  } catch (error) {
    next(error);
  }
});
