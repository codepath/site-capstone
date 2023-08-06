import {
  Avatar,
  Button,
  Container,
  Divider,
  FileButton,
  Flex,
  MultiSelect,
  Text,
  TextInput,
  Textarea,
  Title,
  createStyles
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
// console.log(form.values)
  return (
    <Container mt={"xl"}>
      <Title className={classes.title} mb={"xl"}>Create Your Profile</Title>
      <Flex direction={"column"}>
        <Flex direction={"column"} gap={"md"} align={"center"}>
          <Avatar src={form.values.logoUrl || ""} mb={"md"} radius={"50%"} size={"15rem"} />
            <Flex 
            direction={"column"} 
            justify={"center"}
            align={"center"}
            gap={"sm"}
            mb={"xl"}>
            <FileButton {...form.getInputProps("imageFile")}>
              {(props) => 
                
              <Button
                rightIcon={!form.values.imageFile && <span className="mantine-103svbs mantine-InputWrapper-required mantine-MultiSelect-required" aria-hidden="true"> *</span>} variant="light"
                {...props}
                radius={"lg"}
                styles={{
                  root: {
                    maxWidth: "30rem"
                  }
                }}>
              {form.values.imageFile?.name || "Upload Logo"}
              </Button>
              }
            </FileButton>
            {form.errors.imageFile && <Text color='red dimmed'>Please provide a Logo</Text>}
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
          description={ <><Text>100-300 characters</Text><Text color='black'>Count: {form.values.orgDescription.length}</Text></>}
          minRows={5}
          mb={"md"}
          {...form.getInputProps('orgDescription')}
        />
        <Divider />
        <Title mt={"md"} ta={"left"} order={4}>Additional Contact Information</Title>
        <Text ta={"left"} color="dimmed">So volunteers can reach {form.values.orgName}</Text>
        <TextInput
          withAsterisk
          my={"md"}
          radius={"lg"}
          label="Organization Email"
          placeholder={`"${form.values.email}" or a different email`}
          {...form.getInputProps("publicEmail")}/>
        <TextInput
          radius={"lg"}
          label="Website URL (optional)"
          placeholder="e.g. https://www.helpingtheworld.org/"
          {...form.getInputProps("orgWebsite")}/>
        <TextInput
          my={"md"}
          radius={"lg"}
          type="tel"
          label="Phone Number (optional)"
          placeholder="Format: 123-456-7890"
          {...form.getInputProps("publicNumber")}/>
      </Flex>
    </Container>
  )
}

export default CreateOrgProfileForm