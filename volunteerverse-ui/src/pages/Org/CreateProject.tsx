import React, { useContext, useEffect, useState } from 'react';
// import { useAuthenticationUserProp } from '../../services/hooks/useAuthentication'
import { useForm } from '@mantine/form';
import { ProjectFormValues } from '../../props/forms';
import {
  Button, Container, FileButton,
  Flex, MultiSelect, TextInput,
  Textarea, Title, Image, createStyles, Paper, Divider, useMantineTheme
} from '@mantine/core';
import { apiClient } from '../../services/ApiClient';
import GoBackButton from '../../components/GoBackButton';
import { useMediaQuery } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
import { AuthenticationContext } from '../../context/AuthenicationContext';
import { notifications } from '@mantine/notifications';
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
  const {isAuth, user} = useContext(AuthenticationContext);
  const form = useForm<ProjectFormValues>({
    initialValues: {
      title: "",
      desc: "",
      imageFile: null,
      requestedPeople: 1,
      tags: []
    },
    validateInputOnChange: ["requestedPeople"],
    validate: (values) => ({
      title: values.title.trim().length > 0 ? null : "Please provide a title",
      desc: (values.desc.trim().length < 500 && values.desc.trim().length > 20) ? null : "Please provide a shorter/longer description",
      // imageFile: no image validation required
      requestedPeople: values.requestedPeople > 0 ? null : "Requested people must be greater than 0",
      // tags: no validation needed for tags

    })
  });
  const { classes } = useStyles();
  const [tags, setTags] = useState<string[]>([]);
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const navigate = useNavigate();

  const createNewProject = () => {
    // makes reques to create a new project
    // if the form is valid
    // show loader here
    if (!form.validate().hasErrors) {
      console.log("creating new project with the following form values: ", form.values)
      const payload = {
        ...form.values,
        name: form.values.title,
        tags: ["all"],
        imageUrl: form.values.imageFile?.name || "",
        // @todo: change imageUrl using image hosting api
      }
      apiClient.createProject(payload).then(({ data, success, error, statusCode }) => {
        if (success) {
          console.log("created new project")
          console.log("data : ", data)
          navigate("/");
        } else {
          console.log("failed to create new project. Error:", {error :  error, code : statusCode})
          notifications.show({
            autoClose: 3000,
            color: "red",
            title: 'Uh-oh!',
            message: "An error occured. Please try again later ",
          })
        }
      }).catch((error) => {
        console.log("a very unexpected error has occured", error)
      })
    } else {
      console.log("form has errros: ", form.errors)
    }
    // close loader here
  }

  useEffect(() => {
    apiClient.fetchAllTags().then(({ data, success, error, statusCode }) => {
      // fecthes all all tags from db then sets state
      if (success) {
        console.log("setting tags: ", data.tags)
        setTags(data.tags);
      } else {
        setTags([])
        console.log("unable to retrieve all tags. error: ", {error, statusCode})
      }
    });
  }, [])
  return (
    <>
      <GoBackButton mb={"md"}/>
      <Paper maw={900} mx={"auto"} radius={"lg"} p={"xl"}>
        <Container mt={"xl"}>
          <Title className={classes.title} mb={"xl"} >Create a New Project</Title>
          <Divider py={"md"} />
          <Flex direction={"column"}>
            <Flex direction={"column"} gap={"md"} align={"center"}>
              <Image
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
              maxLength={20}
              size={isMobile ? 'sm' : 'md'}
              radius={"lg"}
              withAsterisk
              label="Project Title"
              placeholder="Full stack developer needed for..."
              description="Max: 20 Characters"
              {...form.getInputProps('title')}
              mb={"md"} />
            <TextInput
              type='number'
              min={1}
              size={isMobile ? 'sm' : 'md'}
              radius={"lg"}
              label="Volunteer Capacity (optional)"
              placeholder="Maximum volunteers needed"
              description=""
              {...form.getInputProps('requestedPeople')}
              mb={"md"} />
            <MultiSelect
              {...form.getInputProps("tags")}
              size={isMobile ? 'sm' : 'md'}
              radius={"lg"}
              searchable
              data={tags}
              label="Project Tags"
              placeholder="Select tags relevant to this project"
              mb={"md"}
            />
            <Textarea
            maxLength={500}
              radius={"lg"}
              size={isMobile ? 'sm' : 'md'}
              withAsterisk
              label="Project Description:"
              placeholder={`Hey there, we're a ${user?.userType} looking to...`}
              description="Max: 500 characters"
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