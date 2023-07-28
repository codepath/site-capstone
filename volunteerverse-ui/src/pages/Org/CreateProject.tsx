import React, { useContext, useEffect, useState } from 'react';
import { useAuthenticationUserProp } from '../../services/hooks/useAuthentication'
import { useForm } from '@mantine/form';
import { ProjectFormValues } from '../../props/forms';
import {
  Button, Container, FileButton,
  Flex, MultiSelect, TextInput,
  Textarea, Title, Image, createStyles, Paper, Divider, ColorSchemeProvider, useMantineTheme
} from '@mantine/core';
import { apiClient } from '../../services/ApiClient';
import GoBackButton from '../../components/GoBackButton';
import { useMediaQuery } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
import { AuthenticationContext } from '../../context/AuthenicationContext';
/**
 * @todo: 
 * - make context for use authenication instead of passing down props?
 * - use context to insert project details page into tab view for org owners
 * - fully connect all of backend to front end starting with an org registertion, then student pages, then all of org pages
 * - then combining the two pages together. Then handle loading states and styling.
 * - and then a student pulling seeing those projects, 
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
    validate: (values) => ({
      title: values.title.trim().length > 0 ? null : "Please provide a title",
      desc: values.desc.trim().length > 500 ? null : "Please provide a shorter description",
      imageFile: values.imageFile ? null : "Please provide a project photo",
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
      }
      apiClient.createProject(form.values).then(({ data, success, error, statusCode }) => {
        if (success) {
          console.log("created new project")
          navigate("/");
        } else {
          console.log("failed to create new project. show error notification here")
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
    apiClient.fetchAllTags().then(({ data, success, error }) => {
      // fecthes all all tags from db then sets state
      if (success) {
        setTags(data.tags);
      } else {
        console.log("unable to retrieve all tags. error: ", error)
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
                <FileButton {...form.getInputProps("imageFile")}>
                  {(props) => <Button variant="light"
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
              size={isMobile ? 'sm' : 'md'}
              radius={"lg"}
              withAsterisk
              label="Project Title"
              placeholder="Your project title"
              description="Full stack developer needed for..."
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
              radius={"lg"}
              size={isMobile ? 'sm' : 'md'}
              withAsterisk
              label="Project Description:"
              placeholder={`Hey there, we're a ${user?.userType} looking to...`}
              description="Max: 500 words"
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