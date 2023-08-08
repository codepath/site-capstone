import { useMantineTheme } from "@mantine/styles";

import { Tabs, Title } from '@mantine/core';
import { useMediaQuery } from "@mantine/hooks";
import { IconUser } from '@tabler/icons-react';
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import GoBackButton from "../../../components/GoBackButton";
import { AuthenticationContext } from "../../../context/AuthenicationContext";
import { apiClient } from "../../../services/ApiClient";
import NotAuthorized from "../../NotAuthorized";
import OrgProjectDetails from "./OrgProjectDetails";
import { VolunteersTable } from "./VolunteersTable";

function OrgProjectDetailsTabs() {

  const { projectId } = useParams();
  const { isValidOrg, user } = useContext(AuthenticationContext);
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const [projetVolunteersCount, setProjectVolunteersCount] = useState<undefined | number>(undefined);
  useEffect(() => {
    // makes call to backend api to populate volunteers data
    console.log("getting volunteers from database")
    if (!projectId) return; // returns if project id is undefined
    apiClient.fetchProjectVolunteersCountById(parseInt(projectId)).then(({ success, data, statusCode, error }) => {
      if (success) {
        console.log("found interested volunteers count: ", data)
        setProjectVolunteersCount(data.count)
      } else {
        console.log("Error occured while trying to find volunteers count: ", {error, statusCode})
      }
    }).catch((error) => {
      console.log("a very unexpected error has occured while trying to find volunteers count", error)
    })
  }, [user])

  return !isValidOrg ? <NotAuthorized /> : (

    <>
      <GoBackButton />
      <Tabs p={"lg"} variant="default" radius="md" defaultValue="volunteers">
        <Tabs.List position="center" >
          <Tabs.Tab value="project" ><Title weight={500} order={isMobile ? 5 : 3}>Project Details</Title></Tabs.Tab>
          <Tabs.Tab value="volunteers" icon={<IconUser size={isMobile ? "20px" : "40px"} />}><Title weight={500} order={isMobile ? 5 : 3}>{`${projetVolunteersCount || "0"}  Volunteer(s)`}</Title></Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel pt={"xs"} value="project">
          <OrgProjectDetails />
        </Tabs.Panel>

        <Tabs.Panel pt={"xs"} value="volunteers">
          <VolunteersTable />
        </Tabs.Panel>

      </Tabs>
    </>
  );
}

export default OrgProjectDetailsTabs