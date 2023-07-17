import { db } from "../db";

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

    }

}