import axios from "axios";
import { API_BASE_URL } from "../../constants";
import { OrganizationRegisterProp, ProjectRegisterProp, VolunteerRegisterProp } from "../props/register";

export interface requestProp {
    method : string,
    bodyData?: object,
    subDirectory : string,
}
export interface ApiResponseProp {
    success: boolean;
    data?: any;
    statusCode: number;
    error?: undefined;
}

class ApiClient {
    private baseUrl: string
    private token : string

    constructor(baseURL : string){
        this.baseUrl = baseURL;
        this.token = "";
    }
    setToken(token : string){
        this.token = token;
        return true
    }
    fetchToken(){
        return this.token;
    }
    request({method, bodyData, subDirectory} : requestProp){

         return axios({
            headers: { bearer: this.token },
            method: method,
            data: bodyData,
            url: this.baseUrl + subDirectory
        }).then((axiosResponse) => {
            // updates response variable if call is successful
            return {
                success: true,
                data: axiosResponse.data,
                statusCode: axiosResponse.status,
                error: undefined
            }
            
        }).catch((axiosError) => {
            // update response variable with error if unsuccessful
            return {
                data: undefined,
                success: false,
                statusCode: axiosError.response?.status,
                error: axiosError,
            }
        });
    }
    async login(credentials : {email : string, password : string}) {
        const requestOptions = {
            method: "post",
            bodyData: credentials,
            subDirectory: "/auth/login"
        }
        return this.request(requestOptions);
    }
    async register(formData: VolunteerRegisterProp | OrganizationRegisterProp) {
        // make request to signup user 
        const requestOptions = {
            method: "post",
            bodyData: formData,
            subDirectory: "/auth/register"
        }
        return this.request(requestOptions)
    }
    async createProject(formData: ProjectRegisterProp ) {
        // creates new project for organizations
        const requestOptions = {
            method: "post",
            bodyData: formData,
            subDirectory: "/project/register"
        }
        return this.request(requestOptions)
    }
    async fetchUserFromToken(){
        // handles user fetch from token
        const requestOptions = {
            method: "get",
            subDirectory: "/auth/me",
        }
        return this.request(requestOptions);
    }

    async fetchProjects(userType: "organization" | "volunteer") {
        /**
         * @todo: use query parameters to filter search?
         */
        const requestOptions = {
            method: "get",
            subDirectory: `/${userType}/projects`,
        };
        return this.request(requestOptions);
    }
    async fetchProjectById(projectId: string){
        const requestOptions = {
            method: "get",
            subDirectory: `/project/${projectId}`,
        }
        return this.request(requestOptions)
    }
    async toggleProjectInterestByUser(projectId : string, mode : "add" | "remove"){
        const requestOptions = {
            method: "put",
            bodyData: {mode :  mode},
            subDirectory: `/volunteer/interest/${projectId}`,
        }
        return this.request(requestOptions)
    }
    async fetchAllTags(){
        const requestOptions = {
            method: "get",
            subDirectory: `/project/tags`
        }
        return this.request(requestOptions)   
    }
    async toggleVolunteerApproval(volunteerEmail : string, projectId: string, mode: "approve" | "reject"){
        const requestOptions = {
            method: "put",
            bodyData: {email: volunteerEmail, initial : mode ===  "approve" ? true : false},
            subDirectory: `/organization/project/${projectId}`,
        }
        return this.request(requestOptions)   
    }
    async toggleProjectStatus({projectId}  : {projectId :  number}){
        const requestOptions = {
            method: "put",
            subDirectory: `/organization/project/status/${projectId}`,
        }
        return this.request(requestOptions) 
    }
    async deleteProject({projectId}  : {projectId :  number}){
        const requestOptions = {
            method: "delete",
            subDirectory: `/organization/project/${projectId}`,
        }
        return this.request(requestOptions) 
    }
    async fetchInterestedVolunteersByProjectId(projectId : number){
        const requestOptions = {
            method: "get",
            subDirectory: `/organization/project/interested/${projectId}`,
        }
        return this.request(requestOptions) 
    }
    async fetchAllInterestedProjects(){
        const requestOptions = {
            method: "get",
            subDirectory: `/volunteer/projects/interested`,
        }
        return this.request(requestOptions) 
    }
    async fetchProjectVolunteersCountById(projectId:  number){
        const requestOptions = {
            method: "get",
            subDirectory: `/organization/project/interested/count/${projectId}`,
        }
        return this.request(requestOptions) 
    }

    async searchProjectsByTitle(query: string){
        const requestOptions = {
            method: "get",
            subDirectory: `/project/search/${query}`,
        }
        return this.request(requestOptions)
    }

    async filterProjectsByTag(tag:string){
        const requestOptions = {
            method: "get",
            subDirectory: `/project/tag/${tag}`
        }
        return this.request(requestOptions)
    }

    async filterProjectsSearchFilter(tags:string[], query:string){
        const tagsQueryString = tags.join('&tags=');
        const requestOptions = {
            method: "get",
            subDirectory: `/project/searchfilter?query=${query}&tags=${tagsQueryString}`
        }
        return this.request(requestOptions)
    }

}

export const apiClient = new ApiClient(API_BASE_URL);