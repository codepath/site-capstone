import e from "express";
import db from "../db";
import { validateFields } from "../utils/validate";
import { BadRequestError, NotFoundError } from "../utils/errors";
import { Organization } from "./organization";
import { Volunteer, VolunteerProjectProp } from "./volunteer";
export interface ProjectCardProp {
  id: number;
  title: string;
  orgName: string;
  founders: string;
  orgUrl?: string;
  description: string;
  createdAt: string | number;
  imageUrl: string;
  requestedVolunteers: number;
  approvedVolunteers: number;
  tags: string[];
}
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
    orgName: string;
    orgPublicEmail: string;
    orgPublicNumber: string;
  }) {
    const requiredInfo = ["orgId", "name", "desc", "tags", "orgName"];
    console.log(projectInfo);
    try {
      validateFields({
        required: requiredInfo,
        obj: projectInfo,
        location: "project registration",
      });
    } catch (error) {
      throw error;
    }
    const query = `INSERT into projects 
    (
      org_id, 
      project_name, 
      project_description,
      image_url,
      requested_people,
      org_name, 
      public_email,
      public_number
      )
    VALUES($1,$2,$3,$4,$5,$6, $7, $8)
    RETURNING *`;
    const result = await db.query(query, [
      projectInfo.orgId,
      projectInfo.name,
      projectInfo.desc,
      projectInfo.imageUrl || null,
      projectInfo.requestedPeople,
      projectInfo.orgName,
      projectInfo.orgPublicEmail,
      projectInfo.orgPublicNumber,
    ]);
    console.log("made query in projects");
    const { id } = result.rows[0];

    projectInfo.tags.forEach((tag) => {
      this.insertTag(id, tag);
    });

    return result.rows[0];
  }

  /**
   * Insert a project and corresponding tag into the project_tags table
   * @param id
   * @param tag
   */
  static async insertTag(id: number, tag: string) {
    const query = `INSERT into project_tags(project_id, tag_name) VALUES ($1,$2) RETURNING *`;
    await db.query(query, [id, tag.toLowerCase()]);
  }

  /**
   * Get's all projects from database with info
   * (currently only for volunteers )
   * @returns
   */
  static async getAllProjects(): Promise<ProjectCardProp[]> {
    const allProjects = [];
    const allProjectIds = (
      await db.query(`SELECT project_id FROM project_tags`)
    ).rows;
    console.log("project ids found", allProjectIds);

    for await (const { project_id } of allProjectIds) {
      console.log("fetching project by id: ", project_id);
      const project = await this.fetchProjectByProjectId(
        project_id,
        "volunteer"
      );
      console.log("retrieved project: ", project);
      allProjects.push(project);
    }

    return allProjects;
  }

  /**
   * Returns project information given the project id
   * (using the ProjectCardProp)
   * @param id
   */
  static async fetchProjectByProjectId(
    projectId: number,
    userType: string,
    email?: string
  ): Promise<ProjectCardProp> {
    const query = `SELECT * FROM projects WHERE id=$1`;
    const result = await db.query(query, [projectId]);
    console.log("HERE ARE THE PROJECTS FOR VOL", result.rows);
    //destructure to extract important info about project
    if (result.rows.length > 0) {
      const {
        id,
        org_id,
        project_name,
        project_description,
        created_at,
        image_url,
        requested_people,
        approved_people,
        active,
        external,
        external_link,
        public_email,
        public_number,
      } = result.rows[0];

      const tags = await this.getProjectTags(project_name);

      if (external == false) {
        const {
          organization_name,
          founders,
          website,
          organization_description,
          logo_url,
        } = await Organization.getOrgById(org_id);
        let projectCard = {
          id: id,
          orgName: organization_name,
          orgDescription: organization_description,
          orgLogoUrl: logo_url,
          founders: founders,
          orgUrl: website,
          title: project_name,
          description: project_description,
          createdAt: created_at,
          imageUrl: image_url,
          requestedVolunteers: requested_people,
          approvedVolunteers: approved_people,
          tags: tags,
          active: active,
        };

        if (userType == "volunteer") {
          // include fields only relevant to a volunteer
          projectCard["interested"] = await Volunteer.expressedInterest(
            id,
            email
          );
          projectCard["approved"] = await Volunteer.fetchProjectApproval(
            id,
            email
          );
          projectCard["orgPublicEmail"] = public_email;
          projectCard["orgPublicNumber"] = public_number;
        }
        return projectCard;
      } else if (external) {
        let projectCard = {
          founders: "",
          imageUrl: image_url,
          title: project_name,
          tags: tags,
          id: id,
          createdAt: created_at,
          orgDescription: null,
          description: project_description,
          orgName: project_name, // currently does not exist in backend
          orgUrl: "", // currently does not exist in backend
          requestedVolunteers: null,
          approvedVolunteers: null,
          external: true,
          externalLink: external_link,
          orgLogoUrl: "",
          active: true,
        };
        return projectCard;

      }
    }
    throw new BadRequestError(`Project ${projectId} does not exist`);
  }

  static async getProjectsWithTag(tag: string, email: string) {
    const query = `SELECT project_id FROM project_tags WHERE tag_name=$1`;
    const result = await db.query(query, [tag]);
    console.log("HERE IS THE PROJECTS WITHT HE TAG", result.rows);

    if (result.rows.length === 0) {
      // Return an empty array if no projects are found with the given tag
      return [];
    } else {
      const projectIds = result.rows.map((row: any) => row.project_id);
      const projects = await Promise.all(
        projectIds.map((projectId: number) =>
          this.fetchProjectByProjectId(projectId, "volunteer", email)
        )
      );
      return projects;
    }
  }

  /**
   * Get the tags of a project
   * @param projectId
   */
  static async getProjectTags(projectName: string) {
    const query = `SELECT tag_name FROM project_tags WHERE project_name=$1`;
    const result = await db.query(query, [projectName]);
    const tags = [];
    if (result) {
      result.rows.forEach((row: any) => {
        tags.push(row.tag_name);
      });
      return tags;
    }
  }

  static async getAllProjectTags() {
    const query = `SELECT DISTINCT tag_name FROM project_tags`;
    const result = await db.query(query, []);
    const tags = [];
    result.rows.forEach((row: any) => {
      tags.push(row.tag_name);
    });
    return tags;
  }

  /**
   * searches through the projects table - filtering by a search term
   * @param term
   * @returns array of projects results
   */
  static async searchProjects(term: string, email: string) {
    const query = `SELECT * FROM projects WHERE project_name ILIKE $1`;
    const searchTerm = `%${term}%`;
    const result = await db.query(query, [searchTerm]);
    console.log(result.rows);
    const projectResults = {};
    if (result) {
      await Promise.all(
        result.rows.map(async (row: any) => {
          projectResults[row.id] = await this.fetchProjectByProjectId(
            row.id,
            "volunteer",
            email
          ); // updating object with new unqiue project
        })
      );


      const activeOnlyProjects = Array.from(
        Object.values(projectResults)
      ).filter((project: VolunteerProjectProp) => project.active === true);
      return activeOnlyProjects;
    }
    else {
      throw new BadRequestError()
    }
  }

  static async searchFilteredProjects(tags:string[], query:string, email:string){
    let projects = [];
    const projectPromises = tags.map(async(tag:string)=> {return await this.getProjectsWithTag(tag, email)});
    try {
      const projectsArrays = await Promise.all(projectPromises);
      const flattenedProjects = projectsArrays.flat();
      
      
    // Filter projects that contain the query
    const filteredProjects = flattenedProjects.filter((project: ProjectCardProp) =>
      project.title.toLowerCase().includes(query)
    );
    
    // Add the filtered projects to your 'projects' array
    projects.push(...filteredProjects);
    return projects;
    } catch (error) {
      console.error('Error fetching projects:', error);
    }

  }
}
