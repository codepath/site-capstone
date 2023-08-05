import { Button, Container, Group, Title, createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    container: {
        height: "100%",
        minWidth: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        [theme.fn.smallerThan("md")]: {
            height: "70%"
        }
    },
    title: {
        fontSize: `calc(${theme.fontSizes.xl} * 1.75)`,
        color: theme.colors.violet[6]
    },
    body: {

    },
    button: {
        transition: "all 150ms ease-in-out",
        "&:hover": {
          backgroundColor: theme.white
        },
        borderWidth: 2,
        [theme.fn.smallerThan('sm')]: {
          // fontSize: `calc(${})`,
          paddingLeft: theme.spacing.md,
          paddingRight: theme.spacing.md,
          flex: 1
        }
    },

}));

function CallToAction({ openModal }: { openModal: () => void }) {
    const { classes } = useStyles();
    return (
        <Container className={classes.container}>
            <Title className={classes.title}>Join Now</Title>
            <Group mt="xl" pt="xl" pl="md">
                <Button
                    className={classes.button}
                    sx={(theme) => ({ "&:hover": { color: theme.colors.violet[7] } })}
                    size="xl" radius={"xl"}
                    onClick={openModal}>Sign Up</Button>
            </Group>
        </Container>
    )
}

export default CallToAction