import { Container, Title, 
    Text, Flex, LoadingOverlay, } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { createStyles } from "@mantine/styles";
import { useEffect } from "react";

const useStyles = createStyles((theme) => ({
    container : {
        minHeight : "32rem",
    }
}));

function SignUpComplete() {
    const { classes } = useStyles();
    const [visible, { toggle }] = useDisclosure(true);
    useEffect(()=> {
        /**
         * @todo make axios call to register new user
         */
        setTimeout(() => {
            toggle()
        }, (2000))
    }, [])
    return (

        <Flex  direction={"column"} align={"center"} justify={"center"} className={classes.container}>
            <LoadingOverlay visible={visible} radius={"xl"}  overlayBlur={2} loaderProps={{ size: "xl"}}/>
        </Flex>
    )
}

export default SignUpComplete