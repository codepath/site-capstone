import { Avatar, Badge, Table, 
    Group, Text,ScrollArea, Paper, 
    useMantineTheme, Button, Flex, CloseButton, 
    ActionIcon, Modal } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { VolunteerProp } from '../../../props/users';
import { IconCheck } from '@tabler/icons-react';
import { useState } from 'react';
import { ApiResponseProp, apiClient } from '../../../services/ApiClient';
import { useParams } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import VolunteerProfileCard from './VolunteerProfileCard';

export function VolunteersTable({ volunteerData }: { volunteerData: VolunteerProp[] }) {
    const { projectId } = useParams();
    const theme = useMantineTheme();
    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
    const [showProfileModal, { open: openProfileModal, close: closeProfileModal }] = useDisclosure(false);
    const [activeVolunteerProfile, setActiveVolunteerProfile] = useState<VolunteerProp>({
        email: "",
        firstName: "Jane",
        lastName: "Doe",
        imageUrl: "",
        bio: "Hey there! My name is HelperHand, the VolunteerVerse mascot! It seems like you've discovered a secret place. Don't tell anyone!",
        approved: undefined
    })

    const VolunteerTableRows = volunteerData.map((volunteer) => {
        const [showApprovedLoader, { open: openApprovedButtonLoader, close: closeApprovedButtonLoader }] = useDisclosure(false);
        const [showRejectedLoader, { open: openRejectedButtonLoader, close: closeRejectedButtonLoader }] = useDisclosure(false);
        const [isApproved, setIsApproved] = useState<boolean | undefined>(volunteer.approved)
        const toggleVolunteerApproval = (volunteerEmail: string) => {
            apiClient.toggleVolunteerApproval(volunteerEmail, projectId || "").then(({ success, data, statusCode, error }: ApiResponseProp) => {
                if (success) {
                    /**
                     * set the new card state
                    */
                    setIsApproved(data.approve);
                    notifications.show({
                        autoClose: 3000,
                        color: "green",
                        title: 'Success!',
                        message: `Volunteer has been ${volunteer.approved ?  "approved" :  "rejected"}.`,
                    })
                } else {
                    console.log("unable to toggle volunteer approval: ", error);
                    notifications.show({
                        autoClose: 3000,
                        color: "red",
                        title: 'Uh-oh!',
                        message: "An error occured. Please try again later ",
                    })
                }
                closeApprovedButtonLoader();
                closeRejectedButtonLoader();
            }).catch((error) => {

                console.log("an unexpected error occured while trying to approve volunteer: ", error)
                closeApprovedButtonLoader();
            });
        }
        const fetchCorrectStatusOption = (pendingOption: any, rejectedOption: any, approvedOption: any) => {
            // handles conditional rendering for differing approval states
            if (isApproved === undefined) {
                return pendingOption;
            } else if (isApproved === false) {
                return rejectedOption;
            } else if (isApproved === true) {
                return approvedOption;
            }
        }
        return (
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
                                <Button 
                                 onClick={() => {setActiveVolunteerProfile(volunteer); openProfileModal()}}
                                 mt={"sm"} 
                                 size={isMobile ? "xs" : "sm"} 
                                 radius={"xl"} 
                                 variant='light'>View Profile</Button>
                            </Group>
                        </Flex>
                    </Flex>
                </td>
                <td>
                    <Group position='center'>
                        <Badge
                            ml={"xl"}
                            size={isMobile ? "md" : 'lg'}
                            radius={"xl"}
                            color={fetchCorrectStatusOption("orange", "red", "green")}
                            variant='light'>{fetchCorrectStatusOption("Pending Approval", "Rejected", "Approved")}</Badge>
                        <Group spacing={10}>
                            {
                                (volunteer.approved == undefined || volunteer.approved === false) && (
                                    <ActionIcon disabled={showRejectedLoader}
                                        loading={showApprovedLoader}
                                        onClick={() => { openApprovedButtonLoader(); toggleVolunteerApproval(volunteer.email) }}
                                        color='green' variant='outline' size={isMobile ? "md" : 'xl'}
                                        radius={"xl"}>
                                        <IconCheck />
                                    </ActionIcon>
                                )
                            }
                            {
                                (volunteer.approved == undefined || volunteer.approved === true) && (
                                    <CloseButton disabled={showApprovedLoader} loading={showRejectedLoader}
                                        onClick={() => { openRejectedButtonLoader(); toggleVolunteerApproval(volunteer.email) }} color='red'
                                        size={isMobile ? "md" : 'xl'} radius={"xl"}
                                        variant='outline' aria-label="Close modal" />
                                )

                            }
                        </Group>
                    </Group>
                </td>
            </tr>
        )
    });

    return (
        <>
            <Modal opened={showProfileModal} onClose={closeProfileModal} radius={"lg"} ta={"center"} centered>
                <VolunteerProfileCard volunteerProfile={activeVolunteerProfile} closeModal={closeProfileModal} />
            </Modal>
            <Paper radius={"lg"} ml={"auto"} mr={"auto"} maw={1000}>
                <ScrollArea>
                    <Table miw={isMobile ? 600 : 800} verticalSpacing="sm">
                        <thead>
                            <tr>
                                <th><Text fz={isMobile ? "md" : "xl"} align="center">Volunteer</Text></th>
                                <th><Text fz={isMobile ? "md" : "xl"} align='center'>Status</Text></th>
                            </tr>
                        </thead>
                        <tbody>{VolunteerTableRows}</tbody>
                    </Table>
                </ScrollArea>
            </Paper>
        </>
    );
};
