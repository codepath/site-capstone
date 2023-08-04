import { useDisclosure } from '@mantine/hooks';
import { Modal, Group, Button, Paper, Avatar, Text } from '@mantine/core';
import { VolunteerUserProp } from '../../../props/users';
import { useNavigate } from 'react-router';
import { IconMail } from '@tabler/icons-react';

export default function VolunteerProfileCard({volunteerProfile, closeModal} : {volunteerProfile: VolunteerUserProp, closeModal: () => void}) {
const { firstName, lastName, imageUrl, bio, approved } = volunteerProfile;
    return (
        <Paper
            radius="md"
            p="lg"
            sx={(theme) => ({
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
            })}>
            <Avatar mb={"xl"} color='violet' src={imageUrl} size={120} radius={"50%"} mx="auto">
                {firstName[0]}{lastName[0]}
            </Avatar>
            <Text ta="center" fz="lg" weight={500} mt="md">
                {`${firstName} ${lastName}`}
            </Text>
            <Text mt={"xl"} ta="center" fz="sm">Bio:</Text>
            <Text ta="center" c="dimmed" fz="sm">{bio}</Text>
            <Group mt={"lg"} spacing={"sm"} position='center'>
                <Button onClick={closeModal} variant='light' radius={"xl"}>Close</Button>
                {
                    approved &&
                    <Button
                    rightIcon={<IconMail />}
                        onClick={() => { window.location.href = `mailto:${volunteerProfile.email}` }}
                        radius={"xl"}
                        variant='outline'>Email {volunteerProfile.firstName}</Button>
                }
            </Group>
        </Paper>
    );
}
