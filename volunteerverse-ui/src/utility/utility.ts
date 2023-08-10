import { notifications } from "@mantine/notifications";
import moment from "moment";
import { ApiResponseProp } from "../services/ApiClient";
import { imagurClient } from "../services/ImagurClient";
import { OrgFormValues, ProjectFormValues, VolunteerFormValues } from "../props/forms";
import { UseFormReturnType } from "@mantine/form";
import { LoginFormProps } from "../pages/Login";

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
    // upload image using imagurClient
    console.log("meta " ,import.meta.env)
    imagurClient.uploadPhoto(file).then((response : ApiResponseProp) => {
        if (response.success) {
            // set image url in state
            setUrl(response.data.data.link)
            console.log("retrieved response from imagur: ", response)
        } else {
            console.log("error uploading image: ", response)
            // notify user of error
            notify.error("An error occured while uploading your image. Please try again later.")
        }
    })    
}

export const demoSignUpFill = (index: number, userType: "organization" | "volunteer", form: UseFormReturnType<VolunteerFormValues> | UseFormReturnType<OrgFormValues>) => {
    if (index == 0) {
        if (userType === "organization") {
            form.setValues({
                orgName: "The Helping Hand Demo",
                email: "helpinghand@demo.com",
                confirmPassword: "123",
                password: "123",
            })
        }else if (userType === "volunteer"){
            form.setValues({
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
            form.setValues({
                logoUrl: "https://media.istockphoto.com/id/1341681278/vector/two-hands-the-concept-of-protecting-anything-vector-illustration-interconnection.jpg?s=612x612&w=0&k=20&c=QZmkMdTLOVyzaPi-SgvHy0KNa8cC47wl0b3mfPyxsM0=",
                founders: ["Kelechi", "Melyssa", "Tom"],
                orgDescription: "HelpingHand is a collaborative volunteer organization harnessing technology for meaningful impact. Our skilled volunteers create solutions, from educational platforms for underserved youth to aiding local businesses. Join us now to shape a better future through innovation and community!",
                orgWebsite: "https://volunteerverse.org/",
                termsOfService: true,
                publicEmail:  "demoorg@contact.com",
                publicNumber: "123-456-7890",
            })
            
        }else if (userType === "volunteer"){
            form.setValues({
                bio: `Hey there! I'm Jane, a passionate full-stack developer. My journey in web development has equipped me with the skills to bring ideas to life. Eager to make a difference, I'm excited to collaborate with organizations in need of innovative digital solutions. Let's create impactful change together.`,
                imageUrl: "https://avatar.iran.liara.run/public/49",
                termsOfService: true,

            })
        }
        
    }
}
export const demoLoginFill = (userType: "organization" | "volunteer", form: UseFormReturnType<LoginFormProps> ) => {
    if (userType === "organization") {
        form.setValues({
            email: "helpinghand@demo.com",
            password: "123",
        })
    }else if (userType === "volunteer"){
        form.setValues({
            email: "janedoe@email.com",
            password: "123",
        })
    }
}
export const demoCreateProjectFill = (form: UseFormReturnType<ProjectFormValues>) => {
    console.log("setting: ", form)
    form.setValues  ({
        title: "UX Researcher needed for HelpingHand Website",
        desc: "HelpingHand is a collaborative volunteer organization harnessing technology for meaningful impact. Our skilled volunteers create solutions, from educational platforms for underserved youth to aiding local businesses. Join us now to shape a better future through innovation and community!",
        tags: ['css', 'backend'],
    })
}