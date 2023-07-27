import React, { useEffect, useState } from 'react';
import { useAuthenticationUserProp } from '../../services/hooks/useAuthentication'
import { useForm } from '@mantine/form';
import { ProjectFormValues } from '../../props/forms';
import {
  Button, Container, FileButton,
  Flex, MultiSelect, TextInput,
  Textarea, Title, Image, createStyles
} from '@mantine/core';
import { apiClient } from '../../services/ApiClient';

const useStyles = createStyles((theme) => ({
  container: {

  },
  image: {
    display: "flex",

  },
  title: {
    [theme.fn.smallerThan("md")]: {
      fontSize: `calc(${theme.fontSizes.xl})`
    },
    [theme.fn.smallerThan("sm")]: {
      fontSize: `calc(${theme.fontSizes.lg} * 1.25)`
    }
  }
}))

function CreateProject({ isAuth, user }: { isAuth: boolean, user: useAuthenticationUserProp }) {
  const form = useForm<ProjectFormValues>({
    initialValues: {
      title: "",
      desc: "",
      imageFile: null,
      requestedPeople: 1,
      tags: []
    },
    validate: (values) => ({
      title: values.title.trim().length > 1 ? null : "Please provide a title",
      desc: values.desc.trim().length > 10 ? null : "Please provide a longer description",
      imageFile: values.imageFile ? null : "Please provide a project photo",
      requestedPeople: values.requestedPeople > 0 ? null : "Requested people must be greater than 0",
      // tags: no validation needed for tags

    })
  });
  const { classes } = useStyles();
  const [tags, setTags] = useState<string[]>([]);
  useEffect(() => {
    // fecthes all all tags from db
    const {data, success, error} = apiClient.fetchAllTags();
    if (success){
      setTags(data.tags);
    }else{
      console.log("unable to retrieve all tags. error: ", error)
    }
  }, [])
  return (
    <Container mt={"xl"}>
      <Title className={classes.title} mb={"xl"} >Create Your Profile</Title>
      <Flex direction={"column"}>
        <Flex direction={"column"} gap={"md"} align={"center"}>
          <Image
            width={200}
            height={200}
            withPlaceholder
            mb={"md"}
            radius={"50%"} />
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
                {...props}
              >{form.values.imageFile?.name || "Upload Logo"}</Button>}

            </FileButton>
          </Flex>
        </Flex>
        <TextInput
                size='md'
                radius={"xl"}
                withAsterisk
                label="Project Title"
                placeholder="Your project title"
                description="Full stack developer needed for..."
                {...form.getInputProps('orgName')} />
        <MultiSelect
            {...form.getInputProps("skills")}
            searchable
            data={tags}
            label="Select Your Skills"
            placeholder="Or skills you're interested in "
             />
        {/* <MultiSelect
          withAsterisk
          data={form.values.founders}
          size={"md"}
          radius={"xl"}
          mb={"xl"}
          searchable
          creatable
          getCreateLabel={(query: string) => `Add Founder: ${query}`}
          onCreate={(query) => {
            const item = { value: query, label: query };
            console.log(form.values)
            return item;
          }}
          label="Founder(s):"
          description="Please enter the first and last names of the founders seperated by a comma.E.g. 'Jane Doe, Jack Wobs'"
          placeholder="Founder(s) Name(s)"
          {...form.getInputProps('founders')}
        /> */}
        <Textarea
          radius={"lg"}
          withAsterisk
          label="Brief Description:"
          placeholder="Brief Description"
          description="Max: 300 words"
          minRows={5}
          {...form.getInputProps('desc')}
        />
        {/* <TextInput
          {...form.getInputProps("orgWebsite")}
          my={"xl"}
          radius={"xl"}
          label="Website URL (optional)"
          placeholder="websiteurl.org"
          {...form.getInputProps('orgName')} /> */}
      </Flex>
    </Container>
  )

}

export default CreateProject