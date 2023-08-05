import { Flex, PasswordInput, TextInput, Title } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { createStyles, useMantineTheme } from "@mantine/styles";
import { VolunteerFormValues } from "../../../props/forms";

const useStyles = createStyles((theme) => ({
    container: {
        margin: "auto 0",
        [theme.fn.smallerThan("sm")] : {
            paddingLeft: `calc(${theme.spacing.xs} * 0.5)`,
            paddingRight: `calc(${theme.spacing.xs} * 0.5)`
        } 
    },
    namesContainer: {
        gap: `calc(${theme.spacing.xl} * 1)`
    },
    nameInputs: {
        flexGrow: 1,
    },
    title:  {
        color: theme.colors.violet[8],
        [theme.fn.smallerThan("xs")] : {
            fontSize: `calc(${theme.fontSizes.lg} * 1.25)`
        }
    }

}));

function CreateVolunteerAccountForm({ form }: { form: UseFormReturnType<VolunteerFormValues> }) {
    const { classes } = useStyles();
    const theme = useMantineTheme();
    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
    
    return (

        <Flex className={classes.container} direction={"column"} gap={"lg"}>
            <Title className={classes.title}>Account Information</Title>
            <Flex className={classes.namesContainer}
                direction={"row"}
                align={"center"}
                gap={"xl"}>
                <TextInput
                    radius={"lg"}
                    size={isMobile ? "sm" : "md"}
                    withAsterisk
                    label="First Name"
                    placeholder="First Name"
                    className={classes.nameInputs}
                    {...form.getInputProps('firstName')} />
                <TextInput
                    radius={"lg"}
                    size={isMobile ? "sm" : "md"}
                    withAsterisk
                    label="Last Name"
                    placeholder="Last Name"
                    className={classes.nameInputs}
                    {...form.getInputProps('lastName')} />
            </Flex>
            <TextInput
            styles={{ label : { marginLeft : "50"}}}
                radius={"lg"}
                size={isMobile ? "sm" : "md"}
                withAsterisk
                label="Email"
                description="You will be contacted by organizations with this email"
                placeholder=""
                {...form.getInputProps('email')} />
            <PasswordInput
                size={isMobile ? "sm" : "md"}
                radius={"lg"}
                withAsterisk
                label="Password"
                placeholder="Password"
                {...form.getInputProps('password')} />
            <PasswordInput
                size={isMobile ? "sm" : "md"}
                radius={"lg"}
                withAsterisk
                label="Confirm Password"
                placeholder="Confirm Password"
                {...form.getInputProps('confirmPassword')} />
        </Flex>

    )
}

export default CreateVolunteerAccountForm