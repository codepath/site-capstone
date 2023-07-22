import {
  Button, Container, Flex,
  LoadingOverlay, Paper, PasswordInput,
  TextInput, Title, createStyles
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks";
import { apiClient } from "../services/ApiClient";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  container: {
    width: "100%",
    height: "100%",
    [theme.fn.smallerThan("sm")]: {
      paddingLeft: `calc(${theme.spacing.xs})`,
      paddingRight: `calc(${theme.spacing.xs})`,
    }
  },
  content: {
    width: "100%",
    maxWidth: "40rem",
    padding: theme.spacing.xl,
    [theme.fn.smallerThan("sm")]: {
      paddingLeft: `calc(${theme.spacing.xs})`,
      paddingRight: `calc(${theme.spacing.xs})`,
    }
  }

}))


export default function Login() {
  const [showButtonLoader, { open: openButtonLoader, close: closeButtonLoader }] = useDisclosure(false)
  const { classes } = useStyles();
  const navigate = useNavigate();
  const loginFormData = useForm({
    initialValues: {
      email: "",
      password: ""
    },
    validate: {
      email: (value) => value === "" ? "Please provide an email" : "",
      password: (value) => value === "" ? "Please provide a password" : ""
    }
  });
  const handleUserLogin = (event : Event) => {
    event.preventDefault();
    console.log("attempting to login user")
    // logs in user using the apiclient class
    openButtonLoader(); // first open button loader
    apiClient.login(loginFormData.values).then(({ data, success, statusCode }) => {
      if (success) {
        console.log("retrieved successx data", data);
        const token = "";
        localStorage.setItem("user_token", token);

        // if request is successful 
        // set user and navigate to 
        navigate("/home");

        closeButtonLoader();
      } else {
        if (statusCode === 404) {
          loginFormData.setFieldError("password", "Invalid email and/or password");
        } else {
          loginFormData.setFieldError("password", "An error occured, please try again");
        }
      }
      /**
       * @todo: update app state and tokenization tings,
       * @ start with student first
       */
    }).catch((error) => {
      console.log("erroring logging in: ", error);
      // console.log("unable to log user potentially cause their email and/or password are incorrect")
      // console.log("show forgot login link")
    })

  }

  return (
    <Flex align={"center"} justify={"center"} direction={"column"} className={classes.container}>
      <Paper shadow="xl" radius={"xl"} className={classes.content}>
        <Title p="lg">Welcome Back!</Title>
        <TextInput m={"md"} radius={"lg"} size="lg" label="Email" placeholder="your@email.com" />
        <PasswordInput m={"md"} radius={"lg"} size="lg" label="Passowrd" placeholder="Password" />
        <Button loading={showButtonLoader} mt={"xl"} onClick={handleUserLogin}>Login</Button>
      </Paper>
      {/* <LoadingOverlay visible={visible} /> */}
    </Flex>
  )
}
