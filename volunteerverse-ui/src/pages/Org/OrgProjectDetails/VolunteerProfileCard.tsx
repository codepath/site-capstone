import { useDisclosure } from '@mantine/hooks';
import { Modal, Group, Button, Paper, Avatar, Text } from '@mantine/core';
import { VolunteerProp } from '../../../props/users';

export default function VolunteerProfileCard({volunteerProfile, closeModal} : {volunteerProfile: VolunteerProp, closeModal: () => void}) {
const { firstName, lastName, imageUrl, bio } = volunteerProfile;
    return (
        <Paper
            radius="md"
            p="lg"
            sx={(theme) => ({
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
            })}>
            <Avatar mb={"xl"} src={imageUrl} size={120} radius={120} mx="auto" />
            <Text ta="center" fz="lg" weight={500} mt="md">
                {`${firstName} ${lastName}`}
            </Text>
            <Text mt={"xl"} ta="center" fz="sm">Bio:</Text>
            <Text ta="center" c="dimmed" fz="sm">{bio}</Text>
            <Button onClick={closeModal} variant='light' mt={"lg"} radius={"xl"}>Close</Button>
        </Paper>
    );
}
