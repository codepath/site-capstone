import { Container, Flex, PasswordInput, TextInput } from "@mantine/core";
import { createStyles } from "@mantine/styles";
import { VolunteerFormValues } from "../../../props/forms";
import { UseFormReturnType } from "@mantine/form";

const useStyles = createStyles(() => ({
    container: {
        
    },
    names: {

    },
}));

function CreateVolunteerAccountForm({ form } : { form : UseFormReturnType<VolunteerFormValues> }) {
    const { classes } = useStyles();

    return (
        
        <Container>
            <Flex className={classes.names} direction={"row"} align={"center"}>
                <TextInput
                    withAsterisk
                    label="First Name"
                    placeholder="First Name"
                    {...form.getInputProps('first_name')} />
                <TextInput
                    withAsterisk
                    label="Last Name"
                    placeholder="Last Name"
                    {...form.getInputProps('last_name')} />
            </Flex>
            <TextInput
                withAsterisk
                label="Email"
                placeholder="Email"  
                {...form.getInputProps('email')} />
            <PasswordInput
                withAsterisk
                label="Password"
                placeholder="Password"  
                {...form.getInputProps('password')} />
            <PasswordInput
                withAsterisk
                label="Confirm Password"
                placeholder="Confirm Password" 
                {...form.getInputProps('confirm_password')} />
        </Container>

    )
}

export default CreateVolunteerAccountForm