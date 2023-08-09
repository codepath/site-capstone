import axios from "axios";
// import { API_BASE_URL } from "../../constants";
import { requestProp } from "./ApiClient";

class ImagurClient {
    private baseUrl: string
    private accessToken: string
    constructor() {
        this.baseUrl = "https://api.imgur.com/3";
        this.accessToken = import.meta.env.IMGUR_ACCESS_TOKEN || "";
    }

    request({ method, bodyData, subDirectory }: requestProp) {
        console.log("authorizaiton header: ", { Authorization: `Bearer ${this.accessToken}` })
        return axios({
            headers: { Authorization: this.accessToken },
            method: method,
            data: {image: bodyData},
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
    async toBase64(file: File): Promise<string> {
        // convert image to base64 using fileRead
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result?.toString() || '');
            reader.onerror = error => reject(error);
        });
        
    }
    async uploadPhoto(image: File) {
        // convert image to base64, then upload to imagur and return data
        const base64Image = await this.toBase64(image);
        const requestOptions = {
            method: "post",
            subDirectory: "/image",
            bodyData: {
                image: base64Image.split(",")[1],
                type: "base64"
            }    
        }
        return this.request(requestOptions);
    }
}

export const imagurClient = new ImagurClient();