import {
    Button,
    Container, Flex, Image,
    Title, createStyles
} from '@mantine/core';
import StudentImage from "../../assets/floatingStudent.png";
import OrgImage from "../../assets/team.png";

const useStyles = createStyles((theme) => ({ 
    container : {
        
    },
    content :{
        [theme.fn.smallerThan("sm")]: {
            padding: 0,
        }
    },
    title : {
        fontSize : `calc(${theme.fontSizes.xl} * 1.75)`,
        color: theme.colors.violet[6],
        padding: theme.spacing.sm,
        marginBottom: theme.spacing.xl,
        textDecoration: "underline"
    },
    gridContainer : {

    },
    bodyContainer : {
        gap: 12,
    },
    bodyLeft : {
    },
    bodyRight : {

    },
    bodyTitle : {
        fontSize: `calc(${theme.fontSizes.md} * 1.25)`,
        color: theme.black,
        fontWeight: 700,
        paddingBottom: theme.spacing.md,
    },
    bodyDescription :{
        marginTop: theme.spacing.md,
        padding: theme.spacing.sm
    }
 }))
function WhatWeDo() {
    const { classes } = useStyles();
    return (
        <Container id={"HowItWorks"} className={classes.container}>
            <Container className={classes.content}>
                <Title className={classes.title}>How It Works</Title>

                <Flex direction={"row"} justify={"space-between"} className={classes.bodyContainer}>

                    <Flex align={"center"} direction={"column"} className={classes.bodyLeft}>
                        <Title className={classes.bodyTitle}>Students:</Title>
                        <Image onClick={() => window.location.href = "/signup/volunteer"} src={StudentImage}/>
                        <Button radius={"lg"} onClick={() => window.location.href = ("/signup/volunteer")} variant="default">Search for opportunties</Button>
                        {/* <Text className={classes.bodyDescription}>Search for opportunties</Text> */}
                    </Flex>
                    <Flex align={"center"} direction={"column"} className={classes.bodyRight}>
                        <Title className={classes.bodyTitle}>Non-Profits:</Title>
                        <Image onClick={() => window.location.href = "/signup/organization"} src={OrgImage} />
                        <Button radius={"lg"} onClick={() => window.location.href = ("/signup/organization") }>Improve your org</Button>
                        {/* <Text className={classes.bodyDescription} >Improve your org</Text> */}
                    </Flex>
                </Flex>
            </Container>
        </Container>
    )
}

export default WhatWeDo