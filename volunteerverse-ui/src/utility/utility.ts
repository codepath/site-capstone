import { notifications } from "@mantine/notifications";
import moment from "moment";

// export const fetchCorrectUserOption =  (
    
//     unAuthOption: any, 
//     volunteerOption: any, 
//     organizationOption: any, 
//     props : {isAuth : boolean | undefined, user : useAuthenticationUserProp | undefined}) => {
//         console.log("choosing option", props)
//         if (!props.isAuth || !props.user){
//             return unAuthOption;
//         }else if (props.user.userType === "volunteer"){
//             return volunteerOption;
//         }else if (props.user.userType === "organization"){
//             return organizationOption;
//         } else{
//             console.log("ERROR: unable to determine correct userType + isAuth option... recieved: \n\nuser:", props.user );
//         }
// }
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