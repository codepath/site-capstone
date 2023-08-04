import { createStyles, useMantineTheme } from "@mantine/styles";
import { VolunteerFormValues } from "../../../props/forms";
import { UseFormReturnType } from "@mantine/form";
import { Avatar, FileButton, MultiSelect, Text } from "@mantine/core";
import {
    Button, Container, Flex,
    Image, Textarea, Title
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { apiClient } from "../../../services/ApiClient";
import { useSkills } from "../../../services/hooks/useSkills";
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
    return (
        <Container>
            <Title
                order={1}
                align="center"
                className={classes.title}
                mb={"xl"}>Create Your Profile</Title>
            <Flex direction={"column"} gap={"md"} align={"center"}>
                <Avatar
                    src={form.values.imageUrl}
                    size={isMobile ? "10rem" :"15rem"}
                    mb={"sm"}
                    color="violet"
                    radius={"50%"}>{firstName[0]}{lastName[0]}</Avatar>
                <FileButton {...form.getInputProps("imageFile")}>
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
                            {form.values.imageFile?.name || "Upload Photo"}</Button>}

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
                size={isMobile ? "sm" : "md"}
                label="Short Bio"
                placeholder={`Hi my name is ${firstName} ${lastName} and...`}
                description="50-300 characters. This is be shown to organizations" />
        </Container>
    )
}

export default CreateVolunteerProfileForm