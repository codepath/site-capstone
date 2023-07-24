import { Container, Title, 
    Text, Flex, LoadingOverlay, } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { createStyles } from "@mantine/styles";
import { useEffect } from "react";
import { apiClient } from "../../services/ApiClient";
import { OrgFormValues, VolunteerFormValues } from "../../props/forms";
import { UseFormReturnType } from "@mantine/form";
import { useNavigate } from "react-router-dom";

const useStyles = createStyles(() => ({
    container : {
        minHeight : "32rem",
    }
}));

function SignUpComplete({ form, setActiveStep} : 
    {form : UseFormReturnType<VolunteerFormValues> | UseFormReturnType<OrgFormValues>, setActiveStep: (step : number) => void}){
    
    const { classes } = useStyles(); // used for styling
    const navigate = useNavigate();
    const [visible, { open: openLoader, close: closeLoader }] = useDisclosure(true);
    useEffect(()=> { 
        openLoader()
        // first remove confirm password and terms of service props
        const {confirmPassword, termsOfService, ...requestBody} = form.values; 

        // then register attempt user registration
        apiClient.register(requestBody).then(({success, statusCode, data, error}) => {
            if (success){
                console.log("new user. data: ", data);
                // stateApi.setAuth(data.token);
                navigate("/")
            }else if (statusCode === 400){
                // statusCode 400 means an invalid input was entered
            } else{
                console.log("error status code: ", statusCode)
                console.log("error trying to register user", error)
                /**
                 * @todo: display error message 
                 */
                // setActiveStep(1)
            }
        }).catch((error) => {
            console.log("a really strange error as occured", error)
        })

    }, [])
    return (

        <Flex  direction={"column"} align={"center"} justify={"center"} className={classes.container}>
            <LoadingOverlay visible={visible} radius={"xl"}  overlayBlur={2} loaderProps={{ size: "xl"}}/>
        </Flex>
    )
}

export default SignUpComplete