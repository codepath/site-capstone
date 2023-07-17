import { Button, Container, Group, Title, createStyles } from '@mantine/core'
import React from 'react'
import { Link } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
    container : {
        backgroundImage: theme.fn.gradient({from: "white",  to: theme.colors.violet[1], deg:180}),
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        [theme.fn.smallerThan("md")] : {
            height: "70%"
        }
    },
    title : {
        fontSize: `calc(${theme.fontSizes.xl} * 1.75)`,
        color: theme.colors.violet[6]
    },
    body : {

    },
    button : {

    },

}));

function CallToAction() {
    const { classes } = useStyles();
  return (
    <Container className={classes.container}>
        <Title className={classes.title}>Join Now</Title>
        <Group mt="xl" pt="xl" pl="md">
            <Button className={classes.button} size="xl" radius={"xl"} component={Link} to={"/signup"}>Sign Up</Button>
            {/* <Button className={classes.button} size="xl" radius={"xl"} component={Link} to={"/login"}>Login</Button> */}
          </Group>
    </Container>
  )
}

export default CallToAction