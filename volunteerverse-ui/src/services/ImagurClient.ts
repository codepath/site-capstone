import axios from "axios";
// import { API_BASE_URL } from "../../constants";
import { requestProp } from "./ApiClient";

class ImagurClient {
    private baseUrl: string
    private clientID: string
    constructor() {
        this.baseUrl = "https://api.imgur.com/3";
        this.clientID = import.meta.env.VITE_IMAGUR_API_CLIENT_ID || "";
    }

    request({ method, bodyData, subDirectory }: requestProp) {
        console.log("authorizaiton header: ", { Authorization: `Client-ID ${this.clientID}` })
        return axios({
            headers: {
                Authorization: `Client-ID ${this.clientID}`,
                "Content-type": "application/x-www-form-urlencoded"
            },
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
        // const base64Image = await this.toBase64(image);
        // console.log(base64Image.split(",")[1]);
        const data = new FormData();
        data.append("image", image);
        // data.append("type", "base64");

        const requestOptions = {
            method: "post",
            subDirectory: "/image",
            bodyData: data
        }
        return this.request(requestOptions);
    }
}
export const imagurClient = new ImagurClient();