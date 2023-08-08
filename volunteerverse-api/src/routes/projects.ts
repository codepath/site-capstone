/** Routes for the project model */

import express from "express";
import { Projects } from "../models/projects";
import { requireAuthenticatedUser } from "../middleware/security";
import qs from "qs";


export const projectRoutes = express.Router();




projectRoutes.post("/register", requireAuthenticatedUser, async function (req, res, next){
    try{
      const {id} = res.locals.user
      console.log(id)
      console.log("req.body", req.body)
      console.log("getting here")
        const project = await Projects.registerProject({...req.body, orgId: id})
        return res.status(201).json(project)
    } catch (error){
        next(error)
    }
})




/** route that gets all the project tags in database */
projectRoutes.get("/tags", async function (req, res, next) {
  try {
    let tags = await Projects.getAllProjectTags();
    tags = tags.length > 0 ? tags : ["HTML", "CSS", "Frontend", "Backend", "Python",]
    console.log("sending tags: ", tags)
    res.status(201).json({ tags: tags });
  } catch (error) {
    next(error);
  }
});

    /**route that filters projects based on query and tags */
    projectRoutes.get("/searchfilter/", requireAuthenticatedUser, 
    async function (req,res, next){
      const { query, tags } = req.query;
      const { email } = res.locals.user;
      // Convert 'tags' to an array using split and filter
      const tagsArray = typeof tags === 'string' ? tags.split(',').filter(tag => tag.trim() !== '') : [];
      // Ensure 'query' is treated as a string
      const queryString = typeof query === 'string' ? query : '';
      try {
        const projects = await Projects.searchFilteredProjects(tagsArray, queryString, email);
        
        res.json(projects);
      } catch (error) {
        res.status(500).json({ error: 'Error fetching projects' });
      }

    })

/**route that gets all projects with given tag */
projectRoutes.get(
  "/tag/:tag_name",
  requireAuthenticatedUser,
  async function (req, res, next) {
    const tag = req.params.tag_name;
    const { user_type, email } = res.locals.user;
    const projects = await Projects.getProjectsWithTag(tag, email);
    if (projects) {
      res.status(201).json(projects);
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
      const { email } = res.locals.user;
      try {
        const projects = await Projects.searchProjects(search, email);
        res.status(201).json(projects);
      } catch (error) {
        next(error);
      }
    }
    );
    /**route that returns project information given the project id */
    projectRoutes.get(
      "/:projectId",
      requireAuthenticatedUser,
      async function (req, res, next) {
        const projectId = parseInt(req.params.projectId);
        const { userType, email } = res.locals.user;
        console.log("USERTYPE", userType);
        try {
          const project = await Projects.fetchProjectByProjectId(
            projectId,
            userType,
            email
          );
          res.status(201).json(project);
        } catch (error) {
          next(error);
        }
      }
    );




    
    