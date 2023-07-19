import { createStyles } from "@mantine/styles";
import { VolunteerFormValues } from "../../../props/forms";
import { UseFormReturnType } from "@mantine/form";
import { Button, Container, Flex, 
    Image, TextInput } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { MouseEventHandler, useRef } from "react";

const useStyles = createStyles(() => ({
    container : {

    },
    image : {

    }
}));

function CreateVolunteerProfileForm({ form }: { form: UseFormReturnType<VolunteerFormValues> }) {
    const openRef = useRef<() => void>(null);
    
    const { classes } = useStyles();
    const openFileBrowswer = () => {
        console.log("opening file browers", openRef)
         openRef.current?.();
        /**
         * @todo open file browswer here
         */
    }
    console.log(form.values)
    const {first_name, last_name} = form.values;
    return (
        <Container>
            <Flex direction={"column"} gap={"md"}>
            <Image p={"xl"} className={classes.image}  withPlaceholder></Image>
            <Button onClick={openFileBrowswer} variant="outline">Upload Photo</Button>
            {/* <TextInput onClick={() => alert("input file clicked")} placeholder="apples" label="Upload Profile Photo" type="file"/> */}
            </Flex>
            <TextInput
                label="Short Bio"
                placeholder={`Hi my name is ${first_name} ${last_name} and...`} 
                description="This will be seen by organizations when you apply for projects"/>
        </Container>
    )
}

export default CreateVolunteerProfileForm