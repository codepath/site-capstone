import { createStyles } from "@mantine/styles";
import { VolunteerFormValues } from "../../../props/forms";
import { UseFormReturnType } from "@mantine/form";
import {
    Button, Container, Flex,
    Image, TextInput, Textarea, Title
} from "@mantine/core";

import { MouseEventHandler, useRef } from "react";

const useStyles = createStyles((theme) => ({
    title : {
        color: theme.colors.violet[9],
        [theme.fn.smallerThan("md")] : {
            fontSize: `calc(${theme.fontSizes.lg} * 1.25)`
        }
    },
 
}));

function CreateVolunteerProfileForm({ form }: { form: UseFormReturnType<VolunteerFormValues> }) {
    const inputRef = useRef<HTMLInputElement>(null);
    const { classes } = useStyles();
    const openFileBrowswer = () => {
        inputRef.current?.click();
    }
    console.log(form.values)
    const { first_name, last_name } = form.values;
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
                    onChange={(event) => console.log(event.target.value)}
                    ref={inputRef}
                    radius={"xl"}
                    styles={{ root: { display: "none" } }}
                    type="file" />
            </Flex>
            <Textarea
            mt={"lg"}
                radius={"lg"}
                size="md"
                label="Short Bio"
                placeholder={`Hi my name is ${first_name} ${last_name} and...`}
                description="This will be seen by organizations when you apply for projects" />
        </Container>
    )
}

export default CreateVolunteerProfileForm