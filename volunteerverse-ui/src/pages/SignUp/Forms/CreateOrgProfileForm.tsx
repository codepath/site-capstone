import React, { ChangeEvent, ChangeEventHandler, useRef, useState } from 'react';
import {
  TextInput,
  Image, Textarea, Checkbox, Button, Group,
  Container, Title, Flex, Box, createStyles,
  LoadingOverlay,
  MultiSelect,
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
  /**
   * @todo: 
   * - change photo value to be a file instead of a string
   * - (you should extract the string title from the file before
   *  posting the file to the db)
   * - handle image hosting
   */
  const { classes } = useStyles()
  const inputRef = useRef<HTMLInputElement>(null); 
  const [imageValue, setImageValue] = useState("")
  const openFileBrowswer = () => {
    inputRef.current?.click(); 
  }
  const setImageUrl : ChangeEventHandler  = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log(form.values)
    form.setFieldValue("imageUrl", file?.name || "");
  }
// console.log(form.values)
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

            <Button variant="light"
              {...form.getInputProps("imageUrl")}
              // value={imageValue}
              radius={"lg"}
              styles={{
                root: {
                  maxWidth: "30rem"
                }
              }}
              onClick={openFileBrowswer}>{form.values.imageUrl || "Upload Logo"}</Button>
            <TextInput
              styles={{
                input: { display: 'none' }
              }}
              onChange={setImageUrl}
              size='md'
              ref={inputRef}
              radius={"xl"}
              type="file" />
          </Flex>
        </Flex>
        <MultiSelect
          withAsterisk
          data={form.values.founders}
          size={"md"}
          radius={"xl"}
          mb={"xl"}
          searchable
          creatable
          getCreateLabel={(query : string) => `Add Founder: ${query}`}
          onCreate={(query) => {
            const item = { value: query, label: query };
            console.log(form.values)
            return item;}}
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
          {...form.getInputProps('orgDescription')}
        />
      </Flex>
    </Container>
  )
}

export default CreateOrgProfileForm