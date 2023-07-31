import {
  Button, Flex,
   Paper, PasswordInput,
  TextInput, Title, createStyles
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks";
import { apiClient } from "../services/ApiClient";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../context/AuthenicationContext";
import { useContext } from "react";


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
  },
  title: {
    color: theme.colors.violet[8]
  }

}))

export default function Login() {
  const { setToken } = useContext(AuthenticationContext)
  const [showButtonLoader, { open: openButtonLoader, close: closeButtonLoader }] = useDisclosure(false)
  const { classes } = useStyles();
  const navigate = useNavigate();
  const loginForm = useForm({
    initialValues: {
      email: "",
      password: ""
    },
    validate: {
      email: (value) => value === "" ? "Please provide an email" : null,
      password: (value) => value === "" ? "Please provide a password" : null
    }
  });

  const handleUserLogin = () => {
    // logs in user using the apiclient class
    openButtonLoader(); // first open button loader
    if (loginForm.validate().hasErrors === false) {
      // attempt use login if form is valid
      console.log("attempting to login user");
      apiClient.login(loginForm.values).then(({ data, success, statusCode }) => {
        if (success) {
          // if request is successful update user_token
          // and navigate to 
          console.log("successfully logged in user", data);
          // localStorage.setItem("user_token", data.token);
          setToken?.(data.token);
          // console.log("set token", data.token)
          navigate("/");
        } else {
          if (statusCode === 401) {
            // status code 401 -> password and email are incorrect
            loginForm.setFieldError("password", "Invalid email and/or password");
          } else {
            // any other status code -> unknown error occured
            loginForm.setFieldError("password", "An error occured, please try again");
          }
          closeButtonLoader();
        }
        
      }).catch((error) => {
        // if login is not possible, 
        // we close the loading button and display and error 
        loginForm.setFieldError("password", "An Error occured, please try again later");
        closeButtonLoader();
        console.log("a really unexpected error occured: ", error);
      })
    } else {
      closeButtonLoader();
      console.log("form has errrors", loginForm.errors)
    }

  }



  return (
    <Flex align={"center"} justify={"center"} direction={"column"} className={classes.container}>
      <Paper shadow="xl" radius={"xl"} className={classes.content}>
        <Title className={classes.title} p="lg">Welcome Back!</Title>
        <TextInput
          {...loginForm.getInputProps("email")}
          m={"md"}
          radius={"lg"}
          size="lg"
          label="Email"
          placeholder="your@email.com" />
        <PasswordInput
          {...loginForm.getInputProps("password")}
          m={"md"}
          radius={"lg"}
          size="lg"
          label="Passowrd"
          placeholder="Password" />
        <Button loading={showButtonLoader} mt={"xl"} onClick={handleUserLogin}>Login</Button>
      </Paper>
    </Flex>
  )
}
