import e from "express";
import db from "../db";
import { validateFields } from "../utils/validate";
import { BadRequestError, NotFoundError } from "../utils/errors";
import { Organization } from "./organization";
import { Volunteer } from "./volunteer";

export class Projects {
  /**
   * Inserts a project and the info into the database
   * @param projectInfo
   */
  static async registerProject(projectInfo: {
    orgId: number;
    name: string;
    desc: string;
    imageUrl?: string;
    requestedPeople: number;
    tags: string[];
  }) {
    const requiredInfo = ["orgId", "name", "desc", "requestedPeople", "tags"];
    try {
      validateFields({
        required: requiredInfo,
        obj: projectInfo,
        location: "project registration",
      });
    } catch (error) {
      throw error;
    }

    const query = `INSERT into projects(org_id, project_name, project_description, image_url, requested_people, approved_people)
        VALUES($1,$2,$3,$4,$5,$6)
        RETURNING *`;
    const result = await db.query(query, [
      projectInfo.orgId,
      projectInfo.name,
      projectInfo.desc,
      projectInfo.imageUrl || null,
      projectInfo.requestedPeople,
      0,
    ]);
    const { id } = result.rows[0];

    projectInfo.tags.forEach((tag) => {
      this.insertTag(id, tag);
    });

    return result.rows[0];
  }

  /**
   * Get a list of volunteers that are interested in specific project
   * @param id
   */
  static async getInterestedVolunteers(id: number) {}

  /**
   * Get a list of approved volunteers for a specific project
   * @param id
   */
  static async getApprovedVolunteers(id: number) {}

  /**
   * Insert a project and corresponding tag into the project_tags table
   * @param id
   * @param tag
   */
  static async insertTag(id: number, tag: string) {
    const query = `INSERT into project_tags(project_id, tag_name) VALUES ($1,$2) RETURNING *`;
    await db.query(query, [id, tag]);
  }

  /**
   * Returns project information given the project id
   * @param id
   */
  static async fetchProjectByProjectId(projectId: number, userType: string, email?:string) {
    const query = `SELECT * FROM projects WHERE id=$1`;
    const result = await db.query(query, [projectId]);
    //destructure to extract important info about project

    if (result) {
      const {
        id,
        org_id,
        project_name,
        project_description,
        created_at,
        image_url,
        requested_people,
        approved_people,
      } = result.rows[0];
      const tags = await this.getProjectTags(id);
      const { organization_name, founders, website } =
        await Organization.getOrgById(org_id);

      let projectCard = {
        id: id,
        orgName: organization_name,
        founders: founders,
        website: website,
        projectName: project_name,
        projectDesc: project_description,
        createdAt: created_at,
        image: image_url,
        requestedPeople: requested_people,
        approvedPeople: approved_people,
        tags: tags,
      };

      if (userType == "volunteer") {
        projectCard["expressedInterest"] = await Volunteer.expressedInterest(projectId, email)
        return projectCard
      }

      if (userType == "organization") {
      }
    }
    return new BadRequestError("Project not found");
  }

  static async getProjectsWithTag(tag: string) {
    const query = `SELECT project_id FROM project_tags WHERE tag_name=$1`;
    const result = await db.query(query, [tag]);

    if (result.rows.length === 0) {
      // Return an empty array if no projects are found with the given tag
      return [];
    } else {
      const projectIds = result.rows.map((row: any) => row.project_id);
      const projects = await Promise.all(
        projectIds.map((projectId: number) =>
          this.fetchProjectByProjectId(projectId, "volunteer")
        )
      );
      return projects;
    }
  }

  /**
   * Get the tags of a project
   * @param projectId
   */
  static async getProjectTags(projectId: number) {
    const query = `SELECT tag_name FROM project_tags WHERE project_id=$1`;
    const result = await db.query(query, [projectId]);
    const tags = [];
    if (result) {
      result.rows.forEach((row: any) => {
        tags.push(row.tag_name);
      });
      return tags;
    }
  }


  static async getAllProjectTags(){
    const query = `SELECT DISTINCT tag_name FROM project_tags`;
    const result = await db.query(query, []);
    const tags = [];
    result.rows.forEach((row:any)=>{tags.push(row.tag_name)})
    return tags;
  }

  /**
   * searches through the projects table - filtering by a search term
   * @param term 
   * @returns array of projects results
   */
  static async searchProjects(term: string) {
    const query = `SELECT * FROM projects WHERE project_name ILIKE $1`;
    const searchTerm = `%${term}%`;
    const result = await db.query(query, [searchTerm]);
    console.log(result.rows);
    const projectResults = [];
    if (result) {
      result.rows.forEach((row: any) => {
        projectResults.push(row);
      });
      return projectResults;
    }
  }
}
