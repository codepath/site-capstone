import {
  Button, Group, Paper, Stepper,
  createStyles, Checkbox, LoadingOverlay,
  Text,
  Modal,
  Title,
  Container,
  ScrollArea,
  Divider
} from "@mantine/core";
import { useContext, useState } from "react";
import { useForm, UseFormReturnType } from "@mantine/form";
import CreateOrgAccountForm from "./Forms/CreateOrgAccountForm";
import CreateOrgProfileForm from "./Forms/CreateOrgProfileForm";
import CreateVolunteerProfileForm from "./Forms/CreateVolunteerProfileForm";
import CreateVolunteerAccountForm from "./Forms/CreateVolunteerAccountForm";
import { VolunteerFormValues, OrgFormValues } from "../../props/forms";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router";
import { apiClient } from "../../services/ApiClient";
import { OrganizationRegisterProp, VolunteerRegisterProp } from "../../props/register";
import { AuthenticationContext } from "../../context/AuthenicationContext";
import { TOS } from "../../assets/TOS";
import { notify } from "../../utility/utility";

const useStyles = createStyles((theme) => ({
  // this object includes all styling for this component
  container: {
    padding: `calc(${theme.spacing.xl} * 2)`,
    margin: `0 auto`,
    maxWidth: 900,
    marginTop: `calc(${theme.spacing.xl} * 2)`,

    [theme.fn.smallerThan("sm")]: {
      paddingLeft: 2,
      paddingRight: 0,
      margin: `0 ${theme.spacing.xs}`
    }
  },
  stepsContainer: {
    maxWidth: 600,
    margin: "0 auto",
    [theme.fn.smallerThan("sm")]: {
      marginLeft: theme.spacing.md
    }
  },
}))

export default function SignUp( {  userType } : {userType : "organization" | "volunteer"}) {
  
  const { setToken } = useContext(AuthenticationContext);
  
  /**
   * @todo: 
   * - test organization registration
   *  - use multi select instead for the inputting founders input
   *  - change the imageFile to accept a file html element instead
   *  - perform some pre-processing for organization form prior to making post request to 
   *  - to properly format data for request body (make modular functions to do this)
   *  - 
   */

  const volunteerForm = useForm<VolunteerFormValues>(
    {
      initialValues: {
        firstName: "",
        lastName: "",
        password: "",
        skills: [],
        confirmPassword: "",
        imageFile: null,
        email: "",
        bio: "",
        termsOfService: false,
        imageUrl: "",
        userType: "volunteer" // need to define userType to make calling backend easier
      },
      validateInputOnChange: ["confirmPassword", "password", "email"],
      validate: (values) => {
        // error validation for all inputs
        // for volunteer forms
        if (activeStep === 0) {
          return {
            firstName: values.firstName.trim().length < 1 ? 'First must be longer than 1 character' : null,
            lastName: values.lastName.trim().length < 1 ? 'Last must be longer than 1 character' : null,
            password: values.password.trim().length < 2 ? 'Please use a stronger password' : null,
            confirmPassword: values.confirmPassword !== values.password ? "Password's do not match" : null,
            email: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(values.email) ? null : 'Please provide a valid email address',
          }
        } else if (activeStep === 1) {
          // only returns these validation contraints once user
          // has reached step 1 (0-based indexing)
          return {
            termsOfService: values.termsOfService === false ? "You must agree to VolunteerVerse's terms of service" : null,
            skills: values.skills.length >= 2 ? null :  "Please select at least two skills",
            bio: values.bio.trim().length >= 50 && values.bio.trim().length <= 300 ? null : 'Your biography must be between 20 - 300 characters long',
          }
        }
        return {}
      },
    },
  );
  const orgForm = useForm<OrgFormValues>({

    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      orgName: "",
      founders: [],
      orgDescription: "",
      imageFile:  null,
      logoUrl:  "",
      orgWebsite: "",
      termsOfService: false,
      publicEmail:  "", 
      publicNumber: "",
      userType: "organization",
    },
    validateInputOnChange: ["confirmPassword",
      "password",
      "email",
      "imageFile",
      "termsOfService",
      "publicNumber",
      "publicEmail",
      "orgDescription",
      "imageFile",

    ],
    
    validate: (values) => {
      if (activeStep === 0) {
        return {
          orgName: values.orgName.trim().length < 2 ? 'Organization must be longer than 2 characters' : null,
          password: values.password.length < 2 ? 'Please use a stronger password' : null,
          confirmPassword: values.confirmPassword !== values.password ? "Password's do not match" : null,
          email: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(values.email) ? null : 'Please provide a valid email address',

        }
      } else if (activeStep === 1) {
        return {
          founders: values.founders.length < 1 ? "Please include at least one founder" : null,
          orgDescription: values.orgDescription.trim().length <= 500 && values.orgDescription.trim().length >= 100 ? null : "Description must be between 100-500 characters.",
          orgName: values.orgName.length < 1 ? "Please include your organization name" : null,
          termsOfService: values.termsOfService === false ? "You must agree to VolunteerVerse's terms of servcie" : null,
          imageFile: values.imageFile ?  null : "A logo must be provided.",
          publicNumber:  /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(values.publicNumber) || values.publicNumber === "" ? null : "Please enter a valid phone number. E.g. 123-456-7890",
          publicEmail: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(values.publicEmail) ? null : 'Please provide a valid email address',
          // orgWebsite:  ^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$.test(values.orgWebsite) || values.orgWebsite === "" ? null : "Please provide a valid website link",
        }
      }
      return {}
    }
  })
  const getTOSInputProps = () => {
    // simple helper functiont to conditionally
    // return termsOfService input props
    if (userType === "organization") {
      return orgForm.getInputProps("termsOfService", { type: 'checkbox' })
    } else {
      return volunteerForm.getInputProps("termsOfService", { type: 'checkbox' })
    }
  }
  const { classes } = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const prevStep = () => setActiveStep((current) => (current > 0 ? current - 1 : current));
  const [showLoader, { open: openLoader, close: closeLoader }] = useDisclosure(false);
  const navigate = useNavigate();
  const [ showTOSModal, {open : openTOSmodal, close: closeTOSModal,}] = useDisclosure(false);

  const nextStep = (form: UseFormReturnType<VolunteerFormValues> | UseFormReturnType<OrgFormValues>) => setActiveStep((current) => {
  
    if (form.validate().hasErrors) {
      // prevents stepper progression
      // if form is invalid
      console.log("form has errors", form.errors)
      return current;
    }
    // continues in stepper progression if form is valid.
    // for more see: https://mantine.dev/form/recipes/ (end of page)
    return (current + 1)
  });
  const registerOrg = async (form: UseFormReturnType<OrgFormValues>) => {
    if (form.validate().hasErrors === false) {
      let { confirmPassword, termsOfService, imageFile, ...rest } = form.values;
      await sendRegisterRequest({ ...rest, founders: rest.founders.toString(), logoUrl: imageFile?.name || "" })
    } else{
      console.log("form has errors", form.errors, form.values)
    }
  };
  const registerVolunteer = async (form: UseFormReturnType<VolunteerFormValues>) => {
    if (form.validate().hasErrors === false) {
      let { confirmPassword, termsOfService, imageFile, ...rest } = form.values;
      await sendRegisterRequest({ ...rest, imageUrl: imageFile?.name || "" })
    } else{
      console.log("form has errors", form.errors)
    }
  };
  const sendRegisterRequest = async (requestBody: VolunteerRegisterProp | OrganizationRegisterProp) => {
    openLoader();
    apiClient.register({ ...requestBody }).then(({ success, statusCode, data, error }) => {
      if (success) {
        console.log("new user. data: ", data);
        setToken?.(data.token);
        navigate("/")
      } else if (statusCode === 400) {
        notify.error("Unable to create account. Check your inputs carefully!"); // shows error notification
        closeLoader();
        // statusCode 400 means an invalid input was entered
      } else {
        notify.error() // shows default error notifcication
        console.log("error status code: ", statusCode)
        console.log("error trying to register user", error)
        closeLoader();
      }
    }).catch((error) => {
      console.log("a really strange error as occured", error)
    })
  };

  return (
    <Paper className={classes.container} shadow="xl" radius="xl" pos={"relative"}>
      <Stepper styles={(theme) => ({
        steps: {
          maxWidth: 600,
          margin: "0 auto",
          [theme.fn.smallerThan("sm")]: {
            marginLeft: theme.spacing.md
          }
        }
      })}
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
            label={ <Text>I agree to VolunteerVerse's<Text c="violet" underline component="a" onClick={openTOSmodal}> terms and conditions</Text></Text>}
            ml={"md"}
            {...getTOSInputProps()} />

        </Stepper.Step>
      </Stepper>

    <Group position="center" mt="xl">
        {
          activeStep === 1 ?
            (
              <>
                <Button variant="default" onClick={prevStep}>Back</Button>
                <Button
                  disabled={userType === "organization" ? orgForm.isValid() === false : volunteerForm.isValid() === false}
                  onClick={() => userType == "organization" ? registerOrg(orgForm) : registerVolunteer(volunteerForm)}>Create Account</Button>
              </>
            )
            :
            (
              <>
                <Button onClick={() => nextStep(userType == "organization" ? orgForm : volunteerForm)}>Continue</Button>
              </>
            )
        }
      </Group>
      <Modal
        styles={{ inner: { paddingLeft: "2rem" }, close : {marginRight : "2rem"}, root : {overflow: "hidden"} }}
        title={<Title m={"xl"} variant="gradient" gradient={{from : "violet", to:"violet"}} align="center">VolunteerVerse Terms of Serivce</Title>}
        closeButtonProps={{ 'aria-label': 'Close modal' }}
        opened={showTOSModal && showTOSModal !== showLoader}
        radius={"xl"}
        onClose={closeTOSModal}
        size="auto"
        centered
        zIndex={1000001}>
        <TOSMOdalContent />
      </Modal>
      <LoadingOverlay visible={showLoader} radius={"xl"} overlayBlur={2} loaderProps={{ size: "xl" }} />
    </Paper>
  );
}

function TOSMOdalContent() {
  return (
    <Container>
      <ScrollArea px={"5rem"}>
      <Title pt="xl"  align="center" mb={"xl"}>Terms and Conditions</Title>
      <Divider my={"xl"} />
      <Text>
        {TOS}
      </Text>
      </ScrollArea>
    </Container>
  )
}
