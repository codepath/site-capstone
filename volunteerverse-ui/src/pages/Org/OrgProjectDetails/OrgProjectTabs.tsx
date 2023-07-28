import { createStyles, useMantineTheme } from "@mantine/styles";
import { useAuthenticationUserProp } from "../../../services/hooks/useAuthentication";

import { Tabs, Title } from '@mantine/core';
import { IconPhoto, IconMessageCircle, IconSettings, IconUsersGroup, IconUsers, IconFaceId, IconUser, IconDashboard, IconFile, IconSubtask, IconActivity, IconHexagon3d, IconAlertCircle, IconCartCheck } from '@tabler/icons-react';
import { useMediaQuery } from "@mantine/hooks";
import { VolunteerProp } from "../../../props/users";
import { useContext, useEffect, useState } from "react";
import GoBackButton from "../../../components/GoBackButton";
import VolunteerProjectDetails from "../../Volunteer/VolunteerProjectDetails";
import { VolunteersTable } from "./VolunteersTable";
import OrgProjectDetails from "./OrgProjectDetails";
import { AuthenticationContext } from "../../../context/AuthenicationContext";
const userList: VolunteerProp[] = [
  {
    email: 'user1@example.com',
    firstName: 'John',
    lastName: 'Doe',
    imageUrl: 'https://example.com/user1.jpg',
    bio: 'A software engineer with a passion for coding.',
    approved: undefined,
  },
  {
    email: 'user2@example.com',
    firstName: 'Alice',
    lastName: 'Smith',
    imageUrl: 'https://example.com/user2.jpg',
    bio: 'Designer and artist exploring creativity.',
    approved: undefined,
  },
  {
    email: 'user3@example.com',
    firstName: 'Mike',
    lastName: 'Johnson',
    imageUrl: 'https://example.com/user3.jpg',
    bio: 'Aspiring entrepreneur and business enthusiast.',
    approved: undefined,
  },
  {
    email: 'user4@example.com',
    firstName: 'Sarah',
    lastName: 'Brown',
    imageUrl: 'https://example.com/user4.jpg',
    bio: 'Nature lover and outdoor enthusiast.',
    approved: undefined,
  },
  {
    email: 'user5@example.com',
    firstName: 'Alex',
    lastName: 'Lee',
    imageUrl: 'https://example.com/user5.jpg',
    bio: 'Passionate about technology and innovation.',
    approved: undefined,
  },
];
const useStyles = createStyles((theme) => ({

}));

function OrgProjectDetailsTabs() {
  // const { isAuth, user } = useContext(AuthenticationContext);
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const [projectVolunteers, setProjectVolunteers] = useState<undefined | VolunteerProp[]>(undefined);

  useEffect(() => {
    // get interested volunteers here;
    // decide whether to approve and reject
  }, [])

  // two tabs, with left tab showing volunteers
  const { classes } = useStyles();

  return (

    <>
      <GoBackButton />
      <Tabs p={"lg"} variant="default" radius="md" defaultValue="volunteers">
        <Tabs.List position="center" >
          <Tabs.Tab value="project" ><Title weight={500} order={isMobile ? 5 : 3}>Project Details</Title></Tabs.Tab>
          <Tabs.Tab value="volunteers" icon={<IconUser size={isMobile ? "1rem" : "2rem"} />}><Title weight={500} order={isMobile ? 5 : 3}>{`${projectVolunteers?.length || ""} Volunteers`}</Title></Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel pt={"xs"} value="project">
          <VolunteerProjectDetails />
        </Tabs.Panel>

        <Tabs.Panel pt={"xs"} value="volunteers">
          <VolunteersTable volunteerData={userList} />
        </Tabs.Panel>

      </Tabs>
    </>
  );
}

export default OrgProjectDetailsTabs