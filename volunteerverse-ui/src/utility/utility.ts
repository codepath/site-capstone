import { useAuthenticationUserProp } from "../services/hooks/useAuthentication";

export const fetchCorrectUserOption =  (
    unAuthOption: any, 
    volunteerOption: any, 
    organizationOption: any, 
    props : {isAuth : boolean, user : useAuthenticationUserProp}) => {
        console.log("choosing option")
        if (props.isAuth === false){
            return unAuthOption;
        }else if (props.user.userType === "volunteer"){
            return volunteerOption;
        }else if (props.user.userType === "organization"){
            return organizationOption;
        } else{
            console.log("ERROR: unable to determine correct user option... recieved: \n\nuser:", props.user );
        }
}