import { Button, Container, Flex, Group, Title, Text } from "@mantine/core";
import { createStyles } from "@mantine/styles";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
    container : {
        maxWidth: "40rem",
    },
    buttons : {

    },
    title : {
        color : theme.colors.violet[8]
    },
    optionsContainer :{
        padding: theme.spacing.xl,
        minHeight: "25rem",
        gap: "4rem",
        [theme.fn.smallerThan("sm")]: {
            flexDirection: "column",
            gap: "1rem",
            minHeight: "auto",
            paddingTop: theme.spacing.xl,
        }
    },
    optionDescription :{
        color: theme.colors.gray[8]
    }
}));

function SignUpModal( {close: closeModal} : {close : () => void}) {
    const { classes } = useStyles()
    return (
        <Container className={classes.container}>

            <Title pt="xl" className={classes.title} align="center">I am a...</Title>
            <Flex pt={0} className={classes.optionsContainer} 
            direction={"row"} 
            justify={"space-evenly"} 
            align={"center"}>
                <Group align="center" position="center">
                    <Button variant="outline"
                        onClick={closeModal}
                        className={classes.buttons}
                        size="xl" radius={"xl"}
                        component={Link}
                        leftIcon={<Text component="span" className="material-symbols-outlined">school</Text>}
                        to={"/signup/volunteer"}>Volunteer</Button>
                    <Text className={classes.optionDescription} align="center">
                        Looking to gain experience as a volunteer
                    </Text>
                </Group>
                <Group align="center" position="center">
                    <Button
                        onClick={closeModal}
                        variant="outline"
                        className={classes.buttons}
                        size="xl" radius={"xl"}
                        component={Link}
                        leftIcon={<Text component="span" className="material-symbols-outlined">groups</Text>}
                        to={"/signup/organization"}>Organization</Button>
                    <Text className={classes.optionDescription} align="center">
                        Looking to find volunteers with technical skills
                    </Text>
                </Group>
            </Flex>
        </Container>
    )
}

export default SignUpModal