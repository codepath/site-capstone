import React, { useRef } from 'react';
import {
  TextInput,
  Image, Textarea, Checkbox, Button, Group,
  Container, Title, Flex, Box, createStyles,
  LoadingOverlay,
} from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { OrgFormValues } from '../../../props/forms';


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


function CreateOrgProfileForm({ form }: { form: UseFormReturnType<OrgFormValues> }) {
  const { classes } = useStyles()
  const inputRef = useRef<HTMLInputElement>(null);
  const openFileBrowswer = () => {
    inputRef.current?.click();
  }

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
          <Button variant="light"
            radius={"lg"}
            mb={"xl"}
            styles={{
              root: {
                maxWidth: "30rem"
              }
            }}
            onClick={openFileBrowswer}>Upload Logo</Button>
          <TextInput
            onChange={(event) => console.log(event.target.value)}
            ref={inputRef}
            radius={"xl"}
            styles={{ root: { display: "none" } }}
            type="file" />
        </Flex>
        <TextInput
          size={"md"}
          radius={"xl"}
          mb={"xl"}
          withAsterisk
          label="Founder(s):"
          description="Please enter the first and last names of the founders seperated by a comma.E.g. 'Jane Doe, Jack Wobs'"
          placeholder="Founder(s) Name(s)"
          {...form.getInputProps('founders')}
        />
        <Textarea
          radius={"lg"}
          withAsterisk
          label="Brief Description:"
          placeholder="Brief Description"
          description="Max: 300 words"
          minRows={5}
          {...form.getInputProps('org_desc')}
        />
      </Flex>
    </Container>
  )
}

export default CreateOrgProfileForm