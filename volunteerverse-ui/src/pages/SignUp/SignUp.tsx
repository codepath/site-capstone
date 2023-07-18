import { 
  Button, Group, Paper, Stepper, 
  createStyles, TextInput, Space, 
  Checkbox, Title, Text, Container, Flex,
} from "@mantine/core";
import { useState } from "react";
import { useForm } from "@mantine/form";
import CreateOrgAccountForm from "./Forms/CreateOrgAccountForm";
import CreateOrgProfileForm from "./Forms/CreateOrgProfileForm";
import CreateVolunteerProfileForm from "./Forms/CreateVolunteerProfileForm";
import CreateVolunteerAccountForm from "./Forms/CreateVolunteerAccountForm";
import { VolunteerFormValues, OrgFormValues } from "../../props/forms";

const useStyles = createStyles((theme) => ({
  container : {
    padding: `calc(${theme.spacing.xl} * 2)`,
    margin: `0 auto`,
    maxWidth: 900,
    marginTop: `calc(${theme.spacing.xl} * 2)`
    // overflow: "clip"
  },
  stepper :{
    padding: `calc(${theme.spacing.xl}) * 10`
  }
}))


export default function SignUp() {
  /**
   * @todo make user type a prop that is passed down from the app state
   */

  const userType = "organization"
  const [active, setActive] = useState(1);
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
  const generalFormValidation = {
    password : (value : string) => (value.length < 2 ? 'Please use a stronger password' : null),
    confirm_password : (value : string, values : (VolunteerFormValues | OrgFormValues)) => (value !== values.password ? "Password's do not match" : null),
    email : (value : string) => (value.length < 2 ? 'Invalid email' : null),
    termsOfService : (value : boolean) => ( value === false ? 'You must accpet our terms of servcie' : null),
  }

  const volunteerForm = useForm<VolunteerFormValues>(
    {
      initialValues: {
        first_name: "",
        last_name: "",
        password: "",
        confirm_password: "",
        image_url: "",
        email: "",
        bio: "",
        termsOfService: false
      },
      validate: {
        ...generalFormValidation,
        first_name: (value: string) => (value.length < 2 ? 'First name cannot be empty' : null),
        last_name: (value: string) => (value.length < 2 ? 'Last name cannot be empty' : null),
      }
    },
  );
  const orgForm = useForm<OrgFormValues>({

      initialValues: {
        email: "",
        password: "",
        confirm_password: "",
        org_name: "",
        founders: "",
        org_desc: "",
        image_url: "",
        termsOfService: false
      },
      validate : {
        ...generalFormValidation,
        founders: (value) => value.length > 3 ? "Please include at least one founder" : null,
        org_desc: (value) => value.length < 2 ? "Please include more details in your description." : null,
        org_name: (value) => value.length < 1 ? "Please include your organization name" : null,
      }

  })
  const getInputFormProps = () => {
    if (userType === "organization"){
      return orgForm.getInputProps("termsOfService", {type: 'checkbox'})
    }else{
      return volunteerForm.getInputProps("termsOfService", {type: 'checkbox'})
    }
  }
  const { classes } = useStyles();
  return (
    <Paper className={classes.container} shadow="xl" radius="xl">
      <Stepper styles={(theme) => ({
        steps: {maxWidth: 600,margin: "0 auto"}})} 
        className={classes.stepper} active={active} onStepClick={setActive} breakpoint="sm">
          
        <Stepper.Step label="Account" description="Enter account info">

          {/* form content for creating a new accont. renders different forms
            depending on if user is a volunteer or organization
           */}

          {userType === "organization" ? 
          (<CreateOrgAccountForm form={orgForm} />)
          : (<CreateVolunteerAccountForm form={volunteerForm} />)
        }
          


        </Stepper.Step>
        <Stepper.Step label="Profile" description="Set up your profile">
          {/* form content for setting up profile accont. renders different forms
            depending on if user is a volunteer or organization
           */}
          {
            userType === "organization" ?
              (<CreateOrgProfileForm form={orgForm} />)
              : (<CreateVolunteerProfileForm form={volunteerForm} />)
          }

          <Checkbox 
          mt={"sm"}
          label="I accept VolunteerVerse's terms and conditions"
          ml={"md"}
          {...getInputFormProps()}/>

        </Stepper.Step>
        <Stepper.Completed>
          <Container>
            <Title>You're All Set!</Title>
            <Text>Some animation graphic would go here </Text>
            {/* display animation checkmark graphic here? */}
            <Text>Redirecting you to the dashboard now...</Text>
            {/* todo: mess around with animations here (stretch) */}

          </Container>
          {/* content for completing user signup */}
          {}
          
        </Stepper.Completed>
      </Stepper>

      <Group position="center" mt="xl">
        <Button variant="default" onClick={prevStep}>Back</Button>
        <Button onClick={nextStep}>Continue</Button>
      </Group>
    </Paper>
  );
}
