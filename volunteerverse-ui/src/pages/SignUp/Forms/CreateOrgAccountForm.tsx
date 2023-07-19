import { 
    Container, Flex, PasswordInput, 
    TextInput, Title, createStyles 
} from '@mantine/core'
import { UseFormReturnType } from '@mantine/form';
import { OrgFormValues } from '../../../props/forms';

const useStyles = createStyles((theme) => ({
    container: {

    },
    names: {

    },
}))

function CreateOrgAccountForm({ form } : {form: UseFormReturnType<OrgFormValues> }) {
    const { classes } = useStyles();

    return (
        <Container className={classes.container}>
            <Title m="xl" >Create an Accont</Title>
            <TextInput
                withAsterisk
                label="Organization Name"
                placeholder="Organization Name" 
                {...form.getInputProps('org_name')} />
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
                {...form.getInputProps('confirm_password')}  />
        </Container>
    )
}

export default CreateOrgAccountForm