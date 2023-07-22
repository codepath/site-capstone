import { 
  Button, Group, Paper, Stepper, 
  createStyles, Checkbox,
} from "@mantine/core";
import { useState } from "react";
import { useForm, UseFormReturnType } from "@mantine/form";
import CreateOrgAccountForm from "./Forms/CreateOrgAccountForm";
import CreateOrgProfileForm from "./Forms/CreateOrgProfileForm";
import CreateVolunteerProfileForm from "./Forms/CreateVolunteerProfileForm";
import CreateVolunteerAccountForm from "./Forms/CreateVolunteerAccountForm";
import { VolunteerFormValues, OrgFormValues } from "../../props/forms";
import SignUpComplete from "./SignUpComplete";
/**
 * @todo: 
 * - style the forms 
 *  - center the inputs to the left
 *  - expand the names inputs to take up entire container
 *  - updating Paper container to be responsive (fix padding)
 * - make inputs have more round corners with slightly bigger text box
 * - effectively style an input tag looking into overriding component= of a TextInput
 * - create final page that redirects user using navigate to the home pages
 *    - (look into makeing an animation with the hand...
 *            im thinking a thumbs up with confetti sprinkles? 
 *            using simple after effects editing )
 * 
 * - create login form with a welcome back title (style appropriately)
 * - accepts email and password and a "remember me checkbox" (to be implemented in the future)
 * - create modal popup that asks if user is a volunteer or an organization (
 *    - structure should be (title : I am a..., 
 *                      body: volunteer image, then organization image. 
 *                      below that text saying volunteer or organization (make responsive).
 *                       entire body should be a button that redirects user to signup page under
 *                        correct userType)
 * 
 * 
 * - develop api requests class in new folder of project
 * - make api calls on login and registration using respective form data
 * - test navigation of user to org or volunteer pages depending on their type 
 * 
 */
const useStyles = createStyles((theme) => ({
  // this object includes all styling for this component
  container : {
    padding: `calc(${theme.spacing.xl} * 2)`,
    margin: `0 auto`,
    maxWidth: 900,
    marginTop: `calc(${theme.spacing.xl} * 2)`,

    [theme.fn.smallerThan("sm")] : {
      paddingLeft: 2,
      paddingRight: 0,
      margin:  `0 ${theme.spacing.xs}`
    }
  },
  stepsContainer: {
    maxWidth: 600,
    margin: "0 auto",
    [theme.fn.smallerThan("sm")] : {
      marginLeft : theme.spacing.md
    }
  },
}))

export default function SignUp({ userType } : {userType : "volunteer" | "organization"}) {
  /**
   * @todo make userType a prop that is passed down from the app level
   */

  const [activeStep, setActiveStep] = useState(0);
  const prevStep = () => setActiveStep((current) => (current > 0 ? current - 1 : current));
  const nextStep = (form : UseFormReturnType<VolunteerFormValues>  | UseFormReturnType<OrgFormValues>) => setActiveStep((current) => {
    
    if (form.validate().hasErrors){
      // prevents stepper progression
      // if form is invalid
      return current;
    }
    // continues in stepper progression if form is valid.
    // for more see: https://mantine.dev/form/recipes/ (end of page)
    return (current < 3 ? current + 1 : current)
  }); 
  
  const volunteerForm = useForm<VolunteerFormValues>(
    {
      initialValues: {
        firstName: "",
        lastName: "",
        password: "",
        skills: [],
        confirmPassword: "",
        imageUrl: "",
        email: "",
        bio: "",
        termsOfService: false,
        userType: "volunteer" // need to define userType to make calling backend easier
      },
      validate : (values) => {
        // error validation for all inputs
        // for volunteer forms
        if (activeStep === 0){
          return {
            firstName: values.firstName.trim().length < 2 ? 'First name cannot be empty' : null,
            lastName: values.lastName.trim().length < 2 ? 'Last name cannot be empty' : null,
            password: values.password.length < 2 ? 'Please use a stronger password' : null,
            confirmPassword: values.confirmPassword !== values.password ? "Password's do not match" : null,
            email : values.email.length < 2 ? 'Invalid email' : null,
          }
        } else if (activeStep === 1){
          // only returns these validation contraints once user
          // has reached step 1 (0-based indexing)
          return {
            termsOfService: values.termsOfService === false ? "You must agree to VolunteerVerse's terms of service" : null,
            bio: values.bio.length > 500 ? 'Please shorten your biography to less than 500 character' : null,
          }
        }
        return {}
      }
    },
  );
  const orgForm = useForm<OrgFormValues>({

      initialValues: {
        email: "",
        password: "",
        confirmPassword: "",
        orgName: "",
        founders: "",
        orgDescription: "",
        imageUrl: "",
        termsOfService: false,
        userType: "organization"
      },
      validate : (values) => {
        if (activeStep === 0){
          return {
            orgName: values.orgName.trim().length < 2 ? 'Organization name cannot be empty' : null,
            password: values.password.length < 2 ? 'Please use a stronger password' : null,
            confirmPassword: values.confirmPassword !== values.password ? "Password's do not match" : null,
            email : values.email.length < 2 ? 'Invalid email' : null,
          }
        } else if (activeStep === 1){
          return {
            founders:  values.founders.length > 3 ? "Please include at least one founder" : null,
            orgDescription:  values.orgDescription.length < 2 ? "Please include more details in your description." : null,
            orgName:  values.orgName.length < 1 ? "Please include your organization name" : null,
            termsOfService: values.termsOfService === false ? "You must agree to VolunteerVerse's terms of servcie" : null,
            imageUrl: values.imageUrl.length < 1 ? "An image must be provided." : null,
          }
        }
        return {}
      }
      
    })
    const getTOSInputProps = () => {
      // simple helper functiont to conditionally
      // return termsOfService input props
      if (userType === "organization"){
        return orgForm.getInputProps("termsOfService", {type: 'checkbox'})
      }else{
      return volunteerForm.getInputProps("termsOfService", {type: 'checkbox'})
    }
  }
  const { classes } = useStyles();

  return (
    <Paper className={classes.container} shadow="xl" radius="xl" pos={"relative"}>
      <Stepper styles={(theme) => ({
        steps: {maxWidth: 600,
          margin: "0 auto",
          [theme.fn.smallerThan("sm")] : {
            marginLeft : theme.spacing.md
          }}})}
          active={activeStep} breakpoint="sm">
          
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
          {...getTOSInputProps()}/>

        </Stepper.Step>
        <Stepper.Completed>
          {/* content for completing user signup */}

            <SignUpComplete form={userType === "organization" ? orgForm : volunteerForm} />
          
        </Stepper.Completed>
      </Stepper>

      <Group position="center" mt="xl">
        {activeStep > 0 ? <Button variant="default" onClick={prevStep}>Back</Button> : <></>}
        <Button onClick={() => nextStep(userType == "organization" ? orgForm : volunteerForm)}>Continue</Button>
      </Group>
    </Paper>
  );
}
