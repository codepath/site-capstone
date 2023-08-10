import { Avatar, Button, Container, FileButton, Flex, MultiSelect, Text, Textarea, Title } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { createStyles, useMantineTheme } from "@mantine/styles";
import { VolunteerFormValues } from "../../../props/forms";
import { useSkills } from "../../../services/hooks/useSkills";
import { handleImageUpload } from "../../../utility/utility";
const useStyles = createStyles((theme) => ({
    title: {
        color: theme.colors.violet[6],
        [theme.fn.smallerThan("md")]: {
            fontSize: `calc(${theme.fontSizes.lg} * 1.25)`
        }
    },

}));

function CreateVolunteerProfileForm({ form }: { form: UseFormReturnType<VolunteerFormValues> }) {
    /**
     * @todo: upload photos onto imagur for file hosting. maybe limit file size too
     * and store the image links in the db
     */
    const { classes } = useStyles();
    const theme = useMantineTheme();
    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
    const skillsTags = useSkills();
    const { firstName, lastName } = form.values;
    const setUrl = (url: string) => {
        form.setFieldValue("imageUrl", url);
    }
    return (
        <Container>
            <Title
                order={1}
                align="center"
                className={classes.title}
                mb={"xl"}>Create Your Profile</Title>
            <Flex direction={"column"} gap={"md"} align={"center"}>
                <Avatar
                    src={form.values.imageUrl || ""}
                    size={isMobile ? "10rem" : "15rem"}
                    mb={"sm"}
                    color="violet"
                    radius={"50%"}>{firstName[0]}{lastName[0]}</Avatar>
                <FileButton 
                    accept="image/png,image/jpeg"
                    {...form.getInputProps("imageFile")}
                    onChange={(e) => { form.getInputProps("imageFile").onChange(e); e ? handleImageUpload(e, setUrl) : null }}>
                    {(props) => <Button

                        mb={"xl"}
                        variant="light"
                        radius={"lg"}
                        styles={{
                            root: {
                                maxWidth: "30rem"
                            }
                        }}
                        {...props}>
                        {form.values.imageFile?.name || "Upload Photo"}</Button>

                    }


                </FileButton>
                {form.errors.imageFile && <Text color='red dimmed'>Please provide a Logo</Text>}
            </Flex>
            <MultiSelect
                withAsterisk
                size={isMobile ? "sm" : "md"}
                {...form.getInputProps("skills")}
                searchable
                radius={"lg"}
                data={skillsTags}
                label="Select Your Skills (at least two)"
                placeholder="Or skills you're interested in "
            />
            <Textarea
                {...form.getInputProps("bio")}
                withAsterisk
                mt={"lg"}
                radius={"lg"}
                minRows={4}
                minLength={50}
                maxRows={4}
                size={isMobile ? "sm" : "md"}
                label="Short Bio"
                placeholder={`Hi my name is ${firstName} ${lastName} and...`}
                description={<><Text>50-300 characters</Text><Text color="black">Count: {form.values.bio.length}</Text></>} />
        </Container>
    )
}

export default CreateVolunteerProfileForm