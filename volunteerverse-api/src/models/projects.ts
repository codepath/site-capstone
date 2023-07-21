import e from "express";
import db from "../db";
import { validateFields } from "../utils/validate";
import { BadRequestError, NotFoundError } from "../utils/errors";

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

  static async fetchProjectByProjectId(projectId: number) {
    const query = `SELECT * FROM projects WHERE id=$1`;
    const result = await db.query(query, [projectId]);

    if (result.rows.length!==0){
      return result.rows[0];
    }

    return new BadRequestError("User not found");
  }

  static async getProjectsWithTag(tag: string) {
    const query = `SELECT project_id FROM project_tags WHERE tag_name=$1`;
    const result = await db.query(query, [tag]);
   

    console.log(result.rows.length)

    if (result.rows.length === 0) {
      // Return an empty array if no projects are found with the given tag
      return []
    }else {
        const projectIds = result.rows.map((row: any) => row.project_id);
        const projects = await Promise.all(projectIds.map((projectId: number) => this.fetchProjectByProjectId(projectId)));
        return projects;
      }
  }
}
