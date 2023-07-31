import { createStyles, useMantineTheme } from "@mantine/styles";
import { useAuthenticationUserProp } from "../../../services/hooks/useAuthentication";

import { Tabs, Title } from '@mantine/core';
import { IconUser } from '@tabler/icons-react';
import { useMediaQuery } from "@mantine/hooks";
import { VolunteerProp } from "../../../props/users";
import { useContext, useEffect, useState } from "react";
import GoBackButton from "../../../components/GoBackButton";
import VolunteerProjectDetails from "../../Volunteer/VolunteerProjectDetails";
import { VolunteersTable } from "./VolunteersTable";
import { AuthenticationContext } from "../../../context/AuthenicationContext";
import NotAuthorized from "../../NotAuthorized";
import OrgProjectDetails from "./OrgProjectDetails";
import { apiClient } from "../../../services/ApiClient";
import { useParams } from "react-router";
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
  const { projectId } = useParams();
  const { isValidOrg } = useContext(AuthenticationContext);
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const [projectVolunteers, setProjectVolunteers] = useState<undefined | VolunteerProp[]>(undefined);
  // handle loading states

  useEffect(() => {
    // makes call to backend api to populate volunteers data
    console.log("getting volunteers from database")
    if (!projectId) return; // returns if project id is undefined
    apiClient.fecthVolunteersByProject(parseInt(projectId)).then(({ success, data, statusCode, error }) => {
      if (success) {
        console.log("found volunteers for given project: ", data)
        setProjectVolunteers(data.interstedVolunteers)
      } else {
        console.log("Error occured while trying to find volunteers: ", {error, statusCode})
      }
    }).catch((error) => {
      console.log("a very unexpected error has occured")
    })
  }, [])

  const { classes } = useStyles();

  return !isValidOrg ? <NotAuthorized /> : (

    <>
      <GoBackButton />
      <Tabs p={"lg"} variant="default" radius="md" defaultValue="volunteers">
        <Tabs.List position="center" >
          <Tabs.Tab value="project" ><Title weight={500} order={isMobile ? 5 : 3}>Project Details</Title></Tabs.Tab>
          <Tabs.Tab value="volunteers" icon={<IconUser size={isMobile ? "1rem" : "2rem"} />}><Title weight={500} order={isMobile ? 5 : 3}>{`${projectVolunteers?.length || ""} Volunteers`}</Title></Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel pt={"xs"} value="project">
          <OrgProjectDetails />
        </Tabs.Panel>

        <Tabs.Panel pt={"xs"} value="volunteers">
          <VolunteersTable volunteerData={userList || []} />
        </Tabs.Panel>

      </Tabs>
    </>
  );
}

export default OrgProjectDetailsTabs