import { createStyles } from "@mantine/styles";
import { VolunteerFormValues } from "../../../props/forms";
import { UseFormReturnType } from "@mantine/form";
import { MultiSelect } from "@mantine/core";
import { skillsTags } from "../../../../constants";
import {
    Button, Container, Flex,
    Image, TextInput, Textarea, Title
} from "@mantine/core";

import { useRef } from "react";

const useStyles = createStyles((theme) => ({
    title : {
        color: theme.colors.violet[9],
        [theme.fn.smallerThan("md")] : {
            fontSize: `calc(${theme.fontSizes.lg} * 1.25)`
        }
    },
 
}));

function CreateVolunteerProfileForm({ form }: { form: UseFormReturnType<VolunteerFormValues> }) {
    /**
     * @todo: upload photos onto imagur for file hosting. maybe limit file size too
     * and store the image links in the db
     */
    const inputRef = useRef<HTMLInputElement>(null); // used to open file broswer
    const { classes } = useStyles();
    const openFileBrowswer = () => inputRef.current?.click();
    const skillsTagsOptions = skillsTags.map((tag) => ({
        value: tag.toLocaleLowerCase(),
        label: tag
    }))

    const { firstName, lastName } = form.values;
    return (
        <Container>
            <Title 
            order={1}
            align="center"
            className={classes.title}
             mb={"xl"}>Create Your Profile</Title>
            <Flex direction={"column"} gap={"md"} align={"center"}>
                <Image
                width={200}
                height={200}
                withPlaceholder
                mb={"md"}
                radius={"50%"}/>
                <Button variant="light" 
                radius={"lg"}
                mb={"xl"}
                styles={{
                    root : {
                        maxWidth: "30rem"
                    }
                }}
                onClick={openFileBrowswer}>Upload Photo</Button>
                <TextInput
                    {...form.getInputProps("imageUrl")}
                    onChange={(event) => console.log(event.target.value)}
                    ref={inputRef}
                    radius={"xl"}
                    styles={{ root: { display: "none" } }}
                    type="file" />
            </Flex>
            <MultiSelect
            {...form.getInputProps("skills")}
            searchable
            data={skillsTagsOptions}
            label="Select Your Skills"
            placeholder="Or skills you're interested in "
             />
            <Textarea
            {...form.getInputProps("bio")}
            mt={"lg"}
                radius={"lg"}
                size="md"
                label="Short Bio"
                placeholder={`Hi my name is ${firstName} ${lastName} and...`}
                description="This will be seen by organizations when you apply for projects" />
        </Container>
    )
}

export default CreateVolunteerProfileForm