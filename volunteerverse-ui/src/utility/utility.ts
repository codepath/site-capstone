import { useAuthenticationUserProp } from "../services/hooks/useAuthentication";

export const fetchCorrectUserOption =  (
    unAuthOption: any, 
    volunteerOption: any, 
    organizationOption: any, 
    props : {isAuth : boolean | undefined, user : useAuthenticationUserProp | undefined}) => {
        console.log("choosing option", props)
        if (!props.isAuth || !props.user){
            return unAuthOption;
        }else if (props.user.userType === "volunteer"){
            return volunteerOption;
        }else if (props.user.userType === "organization"){
            return organizationOption;
        } else{
            console.log("ERROR: unable to determine correct userType + isAuth option... recieved: \n\nuser:", props.user );
        }
}