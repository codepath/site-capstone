import { Button, Container, Flex, 
  LoadingOverlay, Paper, PasswordInput, 
  Text, TextInput, Title, createStyles } from "@mantine/core"
import { Link } from "react-router-dom";
import GoBackButton from "../components/GoBackButton";
import { useDisclosure } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
  container : {
    width: "100%",
    height: "100%",
    [theme.fn.smallerThan("sm")] : {
      paddingLeft: `calc(${theme.spacing.xs})`,
      paddingRight: `calc(${theme.spacing.xs})`,
    }
  },
  content : {
    width: "100%",
    maxWidth: "40rem",
    padding: theme.spacing.xl,
    [theme.fn.smallerThan("sm")] : {
      paddingLeft: `calc(${theme.spacing.xs})`,
      paddingRight: `calc(${theme.spacing.xs})`,
    }
  }

}))

export default function Login() {
  const [visible, { toggle }] = useDisclosure(false)
  const { classes } = useStyles();

  const handleUserLogin = () => {
    /**
     * @todo: login in user
     */
  }
  
  return (
    <Flex align={"center"} justify={"center"} direction={"column"} className={classes.container}>
      <Paper shadow="xl" radius={"xl"} className={classes.content}>
        <Title p="lg">Login</Title>
        <TextInput m={"md"} radius={"lg"} size="lg" label="Email" placeholder="your@email.com" />
        <PasswordInput m={"md"} radius={"lg"} size="lg" label="Passowrd" placeholder="Password" />
        <Button loading={visible} mt={"xl"} onClick={handleUserLogin}>Login</Button>
      </Paper>
      <LoadingOverlay visible={visible} />
    </Flex>
  )
}
