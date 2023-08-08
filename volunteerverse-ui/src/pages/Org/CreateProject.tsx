import {
  Button, Container,
  Divider,
  FileButton,
  Flex,
  Image,
  MultiSelect,
  NumberInput,
  Paper,
  TextInput,
  Textarea, Title,
  createStyles,
  useMantineTheme,
  Text,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMediaQuery } from '@mantine/hooks';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import GoBackButton from '../../components/GoBackButton';
import { AuthenticationContext } from '../../context/AuthenicationContext';
import { ProjectFormValues } from '../../props/forms';
import { apiClient } from '../../services/ApiClient';
import { useSkills } from '../../services/hooks/useSkills';
import { notify } from '../../utility/utility';
import NotAuthorized from '../NotAuthorized';
/**
 * @todo: 
 * - test org deleting project
 * - debug project card not showing 
 * - test showing on students end
 * - test org approving volunteer
 * - test org unaproving volunteer
 * - work on sending 
 */
const useStyles = createStyles((theme) => ({
  container: {
  },
  image: {
    display: "flex",
  },
  title: {
    color: theme.colors.violet[9],
    [theme.fn.smallerThan("md")]: {
      fontSize: `calc(${theme.fontSizes.xl})`
    },
    [theme.fn.smallerThan("sm")]: {
      fontSize: `calc(${theme.fontSizes.lg} * 1.25)`
    }
  }
}))

function CreateProject() {
  const {isValidOrg, user} = useContext(AuthenticationContext);
  const form = useForm<ProjectFormValues>({
    initialValues: {
      title: "",
      desc: "",
      imageFile: null,
      requestedPeople: "",
      tags: [],
      publicEmail: "",
      publicNumber: "",
    },
    validateInputOnChange: ["requestedPeople", "title"],
    validate: (values) => ({
      title: values.title.trim().length > 0  && values.title.trim().length <= 50 ? null : "Title cannot be empty of greater than 50 characters",
      desc: (values.desc.trim().length <= 400 && values.desc.trim().length > 50) ? null : "Descriptoin must be between 50-400 characters long",
      // imageFile: no image validation required
      // no requestedPeople validation required,
      // requestedPeople: values.requestedPeople > 0 ? null : "Requested people must be greater than 0",
      // tags: no validation needed for tags

    })
  });
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const skillsTags = useSkills();
  const navigate = useNavigate();

  const createNewProject = () => {
    // makes reques to create a new project
    // if the form is valid
    // show loader here
    if (!form.validate().hasErrors) {
      console.log("creating new project with the following form values: ", form.values)
      const payload = {
        ...form.values,
        orgName: user?.userType === "organization" ? user.orgName : "",
        name: form.values.title,
        tags: form.values.tags,
        orgPublicEmail: user?.userType === "organization" ? user.publicEmail : "",
        orgPublicNumber: user?.userType === "organization" ? user.publicNumber : undefined,
        imageUrl: form.values.imageFile?.name || "",
        requestedPeople: parseInt(form.values.requestedPeople),

        // @todo: change imageUrl using image hosting api
      }
      apiClient.createProject(payload).then(({ data, success, error, statusCode }) => {
        if (success) {
          console.log("created new project")
          console.log("data : ", data)
          navigate("/");
        } else {
          console.log("failed to create new project. Error:", {error :  error, code : statusCode})
          notify.error();
        }
      }).catch((error) => {
        console.log("a very unexpected error has occured", error)
      })
    } else {
      console.log("form has errros: ", form.errors)
    }
    // close loader here
  }

  return !isValidOrg ? <NotAuthorized /> : (
    <>
      <GoBackButton mb={"md"}/>
      <Paper maw={900} mx={"auto"} radius={"lg"} p={"xl"}>
        <Container mt={"xl"}>
          <Title className={classes.title} mb={"xl"} >Create a New Project</Title>
          <Divider py={"md"} />
          <Flex direction={"column"}>
            <Flex direction={"column"} gap={"md"} align={"center"}>
              <Image
              src={user?.userType === "organization" ? user.logoUrl : ""}
                width={"100%"}
                height={300}
                withPlaceholder
                radius={"lg"}
                mb={"md"} />
              <Flex 
                direction={"column"}
                justify={"center"}
                align={"center"}
                gap={"sm"}
                mb={"xl"}>
                <FileButton {...form.getInputProps("imageFile")} accept="image/png,image/jpeg">
                  {(props) => <Button mb={"xl"} variant="light"
                    radius={"lg"}
                    styles={{
                      root: {
                        maxWidth: "30rem"
                      }
                    }}
                    {...props}>
                    {form.values.imageFile?.name || "Upload Project Cover"}</Button>}
                </FileButton>
              </Flex>
            </Flex>
            <TextInput
              maxLength={50}
              size={isMobile ? 'sm' : 'md'}
              radius={"lg"}
              withAsterisk
              label="Project Title"
              placeholder="Full stack developer needed for..."
              description={<><Text>Max: 50 Characters</Text> <Text color='black'>Count: {form.values.title.length}</Text></>}
              {...form.getInputProps('title')}
              mb={"md"} />
            <NumberInput
              min={0}
              size={isMobile ? 'sm' : 'md'}
              radius={"lg"}
              label="Volunteer Capacity (optional)"
              placeholder="Maximum volunteers needed"
              description=""
              {...form.getInputProps('requestedPeople')}
              mb={"md"} />
            <MultiSelect
              withAsterisk
              size={isMobile ? 'sm' : 'md'}
              radius={"lg"}
              searchable
              data={skillsTags}
              label="Project Tags"
              description="Please select at least two"
              placeholder="Select tags relevant to this project (at least two)"
              mb={"md"}
              {...form.getInputProps("tags")}
            />
            <Textarea
              maxLength={400}
              radius={"lg"}
              size={isMobile ? 'sm' : 'md'}
              withAsterisk
              label="Project Description:"
              placeholder={`${user?.userType === "organization" ? user.orgName : ""} is committed to making a positive impact in the world by...`}
              description={<><Text>50-400 characters long</Text> <Text color='black'>Count: {form.values.desc.length}</Text></>}
              minRows={5}
              {...form.getInputProps('desc')}
            />
          </Flex>
        </Container>
        <Button onClick={createNewProject} radius={"lg"} size='lg' mt={"xl"}>Create Project</Button>
      </Paper>
    </>
  )

}

export default CreateProject