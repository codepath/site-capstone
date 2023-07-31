import axios from "axios";
import { API_BASE_URL } from "../../constants"
import { OrganizationRegisterProp, VolunteerRegisterProp, ProjectRegisterProp } from "../props/register";
import { QueryProps } from "../components/QueryBar";

interface requestProp {
    method : string,
    bodyData?: object,
    subDirectory : string
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

    async fetchProjects(userType: "organization" | "volunteer", query: QueryProps) {
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
    async updateProjectInterestByUser(projectId : string){
        const requestOptions = {
            method: "get",
            subDirectory: `/project/${projectId}`,
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
    async toggleVolunteerApproval(volunteerEmail : string, projectId: string){
        const requestOptions = {
            method: "put",
            bodyData: {email: volunteerEmail},
            subDirectory: `/organization/project/${projectId}`,

        }
        return this.request(requestOptions)   
    }
}

export const apiClient = new ApiClient(API_BASE_URL);