import { Avatar, Badge, Table, Group, Text, Select, ScrollArea, Paper, useMantineTheme, Button, Flex, Container, CloseButton, ActionIcon } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { VolunteerProp } from '../../../props/users';
import { IconCheck } from '@tabler/icons-react';

interface VolunteerTableProp {
    data: { avatar: string; firstName: string; email: string; role: string }[];
}


const rolesData = ['Manager', 'Collaborator', 'Contractor'];
const approvedVolunteer = () => {

};
const rejectVolunteer = () => {

};

export function VolunteersTable({ volunteerData }: { volunteerData: VolunteerProp[] }) {
    const theme = useMantineTheme();
    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
    const openVolunteerProfileModal = (action : string) => {
        console.log("open volunteer proile modal here and get result")
    }

    const rows = volunteerData.map((volunteer) => (
        <tr key={volunteer.firstName}>
            <td>
                <Flex ml={"xl"} mr={"xl"} maw={20} gap={"md"} direction={"row"} >
                    <Avatar size={isMobile ? 60 : 100} src={volunteer.imageUrl} radius={"xl"} />
                    <Flex align={"start"} direction={"column"}>
                        <Text ml={"xs"} align='left' fz={isMobile ? "md" : "xl"} fw={500}>
                            {volunteer.firstName} {volunteer.lastName}
                        </Text>
                        <Text ml={"xs"} align='left' fz={isMobile ? "sm" : "xl"} c="dimmed">
                            {volunteer.email}
                        </Text>
                        <Group>
                            <Button mt={"sm"} size={isMobile ? "xs" : "sm"} radius={"xl"} variant='light'>View Profile</Button>
                        </Group>
                    </Flex>
                </Flex>
            </td>
            <td>
                <Group position='center'>
                    <Badge ml={"xl"} size={isMobile ? "md" : 'lg'} radius={"xl"} variant='light'>{ "Pending Approval"}</Badge>
                    <Group spacing={10}>
                        <ActionIcon onClick={approvedVolunteer} color='green' variant='outline' size={isMobile ? "md" : 'xl'} radius={"xl"}>
                            <IconCheck />
                        </ActionIcon>
                        <CloseButton onClick={rejectVolunteer} color='red' size={isMobile ? "md" : 'xl'} radius={"xl"} variant='outline' aria-label="Close modal" />
                    </Group>
                </Group>
            </td>
        </tr>
    ));

    return (
        <Paper radius={"lg"} ml={"auto"} mr={"auto"} maw={1000}>
            <ScrollArea>
                <Table miw={ isMobile ? 600 :800} verticalSpacing="sm">
                    <thead>
                        <tr>
                            <th><Text fz={isMobile ? "md" : "xl"} align="center">Volunteer</Text></th>
                            <th><Text fz={isMobile ? "md" : "xl"} align='center'>Status</Text></th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            </ScrollArea>

        </Paper>
    );
}