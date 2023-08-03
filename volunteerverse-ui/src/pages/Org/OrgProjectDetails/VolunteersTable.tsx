import {
    Avatar, Badge, Table,
    Group, Text, ScrollArea, Paper,
    useMantineTheme, Button, Flex, CloseButton,
    ActionIcon, Modal, Container
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { VolunteerUserProp } from '../../../props/users';
import { IconCheck, IconCircleLetterG } from '@tabler/icons-react';
import { useState } from 'react';
import { ApiResponseProp, apiClient } from '../../../services/ApiClient';
import { useParams } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import VolunteerProfileCard from './VolunteerProfileCard';
import NoneFound from '../../../components/NoneFound';
import { notify } from '../../../utility/utility';

export function VolunteersTable({ volunteerData }: { volunteerData: VolunteerUserProp[] }) {
    const { projectId } = useParams();
    const theme = useMantineTheme();
    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
    const [showProfileModal, { open: openProfileModal, close: closeProfileModal }] = useDisclosure(false);
    const [activeVolunteerProfile, setActiveVolunteerProfile] = useState<VolunteerUserProp>({
        email: "",
        firstName: "Helper",
        lastName: "Hand",
        imageUrl: "",
        bio: "Hey there! My name is Helper Hand, the VolunteerVerse mascot! It seems like you've discovered a secret place. Don't tell anyone!",
        approved: undefined,
        id: -1,
        userType: "volunteer",
        skills: ["Being Purple"],

    })

    const VolunteerRow = (volunteer: VolunteerUserProp) => {
        /**
         * @todo: connect approval and unapproval to backend
         */
        const [showApprovedLoader, { open: openApprovedButtonLoader, close: closeApprovedButtonLoader }] = useDisclosure(false);
        const [showRejectedLoader, { open: openRejectedButtonLoader, close: closeRejectedButtonLoader }] = useDisclosure(false);
        const [isApproved, setIsApproved] = useState<boolean | undefined>(volunteer.approved)
        const toggleVolunteerApproval = (volunteerEmail: string, mode: "approve" | "reject") => {
            apiClient.toggleVolunteerApproval(volunteerEmail, projectId || "", mode).then(({ success, data, statusCode, error }: ApiResponseProp) => {
                if (success) {
                    /**
                     * set the new card state
                    */
                    console.log("data while updating volunteer approrval: ", data)
                    setIsApproved(data.approve);
                    // show success notification
                    notify.success(`Volunteer has been ${isApproved ? "rejected" : "approved"}.`)
                } else {
                    // show error notification
                    notify.error();
                    console.log("unable to toggle volunteer approval: ", error);
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
            if (isApproved === null) {
                return pendingOption;
            } else if (isApproved === false) {
                return rejectedOption;
            } else if (isApproved === true) {
                return approvedOption;
            } else {
                console.log("ERRORR: unabel to determienr correct status option with : ", isApproved)
            }
        }
        return (
            <tr key={volunteer.firstName}>
                <td>
                    <Flex ml={"xl"} mr={"xl"} maw={20} gap={"md"} direction={"row"} >
                        <Avatar size={isMobile ? 60 : 100} src={volunteer.imageUrl} radius={"xl"} />
                        <Container>
                            <Text ml={"xs"} align='left' fz={isMobile ? "md" : "xl"} fw={500}>
                                {volunteer.firstName} {volunteer.lastName}
                            </Text>

                            <Group noWrap={!isMobile} position='center' mt={"sm"}>
                                <Button
                                    onClick={() => { setActiveVolunteerProfile(volunteer); openProfileModal() }}
                                    size={isMobile ? "xs" : "sm"}
                                    radius={"xl"}
                                    variant='light'>View Profile</Button>
                                {
                                    isApproved &&
                                    <Button
                                        onClick={() => { window.location.href = `mailto:${volunteer.email}` }}

                                        size={isMobile ? "xs" : "sm"}
                                        radius={"xl"}
                                        variant='outline'>Contact {volunteer.firstName}</Button>
                                }
                            </Group>
                        </Container>
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
                                (isApproved == null || isApproved === false) && (
                                    <ActionIcon
                                        title={`approve ${volunteer.firstName}?`}
                                        disabled={showRejectedLoader}
                                        loading={showApprovedLoader}
                                        onClick={() => { openApprovedButtonLoader(); toggleVolunteerApproval(volunteer.email, "approve") }}
                                        color='green' variant='outline' size={isMobile ? "md" : 'xl'}
                                        radius={"xl"}>
                                        <IconCheck />
                                    </ActionIcon>
                                )
                            }
                            {
                                (isApproved == null || isApproved === true) && (
                                    <CloseButton disabled={showApprovedLoader} loading={showRejectedLoader}
                                        title={`reject ${volunteer.firstName}?`}

                                        onClick={() => { openRejectedButtonLoader(); toggleVolunteerApproval(volunteer.email, "reject") }} color='red'
                                        size={isMobile ? "md" : 'xl'} radius={"xl"}
                                        variant='outline' aria-label="Close modal" />
                                )

                            }
                        </Group>

                    </Group>
                </td>
            </tr>
        )
    }
    const VolunteerTableRows = volunteerData.map((volunteer) => <VolunteerRow {...volunteer} />);
    console.log("rendering volunteer data: ", volunteerData)
    return VolunteerTableRows.length === 0 ? <NoneFound /> : (
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
