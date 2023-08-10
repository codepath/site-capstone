import {
    Container,
    PasswordInput,
    TextInput, Title, createStyles
} from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { OrgFormValues } from '../../../props/forms';

const useStyles = createStyles((theme) => ({
    container: {

    },
    names: {

    },
    title : {
        color: theme.colors.violet[9],
        fontSize: `calc(${theme.fontSizes.xl} * 2)`,

        [theme.fn.smallerThan("md")] : {
            fontSize: `calc(${theme.fontSizes.xl})`
        },
        [theme.fn.smallerThan("sm")] : {
            fontSize: `calc(${theme.fontSizes.lg} * 1.25)`
        }
    },
}))

function CreateOrgAccountForm({ form } : {form: UseFormReturnType<OrgFormValues> }) {
    const { classes } = useStyles();

    return (
        <Container className={classes.container}>
            <Title order={1} className={classes.title} mb="xl" >Create an Accont</Title>
            <TextInput
                size='md'
                radius={"xl"}
                withAsterisk
                label="Organization Name"
                placeholder="Organization Name"
                {...form.getInputProps('orgName')} />
            <TextInput
                radius={"xl"}
                size='md'
                withAsterisk
                label="Email"
                placeholder="Email"
                {...form.getInputProps('email')} />
            <PasswordInput
                radius={"xl"}
                size='md'
                withAsterisk
                label="Password"
                placeholder="Password"
                {...form.getInputProps('password')} />
            <PasswordInput
                radius={"xl"}
                size='md'
                withAsterisk
                label="Confirm Password"
                placeholder="Confirm Password" 
                {...form.getInputProps('confirmPassword')}  />
        </Container>
    )
}

export default CreateOrgAccountForm