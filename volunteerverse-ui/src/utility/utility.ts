import { notifications } from "@mantine/notifications";
import moment from "moment";
import { ApiResponseProp } from "../services/ApiClient";
import { imagurClient } from "../services/ImagurClient";

export const fetchPrettyTime = (timestamp :  number) => {
    /**
     * @description: converts epcoch timestamp into a nice 
     * human readable time format using moment.js
     */
    return moment(timestamp).fromNow();
}
export const notify = {
    error : (message :string = "An error occured. Please try again later") => notifications.show({
        autoClose: 3000,
        color: "red",
        title: 'Uh-oh!',
        message: message,
    }),
    success : (message : string  = "") => notifications.show({
        autoClose: 3000,
        color: "green",
        title: 'Success!',
        message: message,

    }),
}
export const handleImageUpload = (file : File, setUrl : (urlLink : string) => void) => {
    console.log("handling image upload event with file: ", file)
    // imagurClient.uploadPhoto(event);
    // upload image using imagurClient
    imagurClient.uploadPhoto(file).then((response : ApiResponseProp) => {
        if (response.success) {
            // set image url in state
            setUrl(response.data.data.link)
            console.log("retrieved response from imagur: ", response)
            // setUrl(response.link);
        } else {
            console.log("error uploading image: ", response)
            // notify user of error
            notify.error("An error occured while uploading your image. Please try again later.")
        }
    })    
}

export const demoFill = (index: number, userType: "organization" | "volunteer", form: any) => {
    if (index == 0) {
        if (userType === "organization") {
            form.setFieldsValue({
                firstName: "Jane",
                email: "janedoe@email.com",
                confirmPassword: "123",
                lastName: "Doe",
                password: "123",
            })
        }else if (userType === "volunteer"){
            form.setFieldsValue({
                firstName: "Jane",
                email: "janedoe@email.com",
                confirmPassword: "123",
                lastName: "Doe",
                password: "123",
            })

        }
    }
    else if(index == 1) {
        if (userType === "organization"){
            form.setFieldsValue({
                organizationName: "Demo Organization",
                organizationEmail: ""
            })

        }else if (userType === "volunteer"){
            form.setFieldsValue({
                bio: `I am a demo volunteer I am a demo volunteer I am a demo volunteer I am a demo volunteer I am a demo volunteer I am a demo volunteer I am a demo volunteer I am a demo volunteer I am a demo volunteer I am a demo volunteer I am a demo volunteer I am a demo volunteer I am a demo volunteer I am a demo volunteer I am a demo volunteer I am a demo volunteer`,
                skills: ["cooking", "cleaning", "teaching"],
                imageUrl: "https://i.imgur.com/3Z4tELV.png",

            })
        }
        
    }
}