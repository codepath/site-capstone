import React from 'react';
import { 
  TextInput, 
  Image, Textarea ,Checkbox, Button, Group, 
  Container, Title, Flex, Box, createStyles,
} from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { OrgFormValues } from '../../../props/forms';


const useStyles = createStyles(() => ({
  container : {

  },
  image : {
    display: "flex",

  }
}))


function CreateOrgProfileForm({ form } : {form : UseFormReturnType<OrgFormValues>}) {
  const { classes } = useStyles()

  return (
    <Container mt={"xl"}>
      <Title mb={"xl"} >Create Your Profile</Title>
      <Flex direction={"column"}>
        {/* <Flex p={"sm"} align={"center"} justify={"center"}>
        DROP ZONE TO APPEAR HEAR
          <Image className={classes.image} radius={"xl"} withPlaceholder width={200} height={200}/>
        </Flex> */}
        <TextInput
          withAsterisk
          label="Founder(s):"
          description="Please enter the first and last names of the founders seperated by a comma.E.g. 'Jane Doe, Jack Wobs'"
          placeholder="Founder(s) Name(s)" 
          {...form.getInputProps('founders')}
          />
        
          <Textarea withAsterisk
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