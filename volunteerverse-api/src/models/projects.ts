import e from "express";
import db  from "../db";
import { validateFields } from "../utils/validate";
import { BadRequestError } from "../utils/errors";

export class Projects{

    /**
     * Inserts a project and the info into the database
     * @param projectInfo 
     */
    static async registerProject(projectInfo : {
        orgEmail:string;
        name:string;
        desc:string;
        imageUrl?:string;
        requestedPeople:number;
        tags:string[];
    }){
        const requiredInfo = ["orgEmail", "name", "desc", "requestedPeople", "tags"]
        try{
            validateFields({required: requiredInfo, obj: projectInfo, location: "project registration"})
        } catch (error) {
            throw error
        }

        const query = `INSERT into projects(email, project_name, project_description, image_url, requested_people, approved_people)
        VALUES($1,$2,$3,$4,$5,$6)
        RETURNING *`
        const result = await db.query(query, [projectInfo.orgEmail, projectInfo.name, projectInfo.desc, projectInfo.imageUrl, projectInfo.requestedPeople, 0])
        const {id} = result.rows[0]

        projectInfo.tags.forEach((tag)=> {this.insertTag(id, tag)})

        return result.rows[0]
    }

    /**
     * Get a list of volunteers that are interested in specific project
     * @param id 
     */
    static async getInterestedVolunteers(id:number){

    }


    /**
     * Get a list of approved volunteers for a specific project
     * @param id 
     */
    static async getApprovedVolunteers(id:number){

    }


    /**
     * Insert a project and corresponding tag into the project_tags table
     * @param id 
     * @param tag 
     */
    static async insertTag(id:number, tag:string){
        const query = `INSERT into project_tags(project_id, tag_name) VALUES ($1,$2) RETURNING *`
        await db.query(query, [id, tag])
    }


    /**
     * Returns project information given the project id
     * @param id 
     */

    static async fetchProjectByProjectId(projectId:number){
        const query = `SELECT * FROM projects WHERE id=$1`
        const result = await db.query(query,[projectId])

        if (result){
        return result.rows[0]}

        return new BadRequestError("User not found")

    }

}