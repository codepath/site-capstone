import { useDisclosure } from '@mantine/hooks';
import { Modal, Group, Button, Paper, Avatar, Text } from '@mantine/core';
import { VolunteerUserProp } from '../../../props/users';
import { useNavigate } from 'react-router';

export default function VolunteerProfileCard({volunteerProfile, closeModal} : {volunteerProfile: VolunteerUserProp, closeModal: () => void}) {
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
            <Group mt={"lg"} spacing={"sm"} position='center'>
                <Button onClick={closeModal} variant='light' radius={"xl"}>Close</Button>
                {
                    volunteerProfile.approved &&
                    <Button
                        onClick={() => { window.location.href = `mailto:${volunteerProfile.email}` }}
                        radius={"xl"}
                        variant='outline'>Contact {volunteerProfile.firstName}</Button>
                }
            </Group>
        </Paper>
    );
}
