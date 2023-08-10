import {
  Badge,
  Button,
  Container,
  Divider,
  Flex,
  Group, Image,
  Paper,
  Text,
  Title,
  useMantineTheme
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { QueryBar, QueryProps } from '../../components/QueryBar';
import NotAuthorized from '../NotAuthorized';
// import { projectDetailsData } from './Home/data';
import { useMediaQuery } from '@mantine/hooks';
import { IconHelp } from '@tabler/icons-react';
import NoneFound from '../../components/NoneFound';
import { AuthenticationContext } from '../../context/AuthenicationContext';
import { VolunteerProjectProp } from '../../props/projects';
import { ApiResponseProp, apiClient } from '../../services/ApiClient';
import { fetchPrettyTime } from '../../utility/utility';

function SlimProjectCard(project: VolunteerProjectProp) {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const fetchCorrectStatusOption = (pendingOption: any, rejectedOption: any, approvedOption: any) => {
    // handles conditional rendering for differing approval states
    if (project.approved === null) {
      return pendingOption;
    } else if (project.approved === false) {
      return rejectedOption;
    } else if (project.approved === true) {
      return approvedOption;
    } else {
      console.log("ERRORR: unabel to determienr correct status option with : ", project.approved)
    }
  }

  return (
    <Paper
    w={"100%"}
    sx={(theme) => ({
      "&:hover": { "transform": "scale(1)", boxShadow: `${theme.shadows.xl}` },
      transform: "scale(0.99)",
      transition: "all 300ms ease-in-out"
    })} m={ isMobile ? 0 : "md"} p={isMobile ? 0 :"lg"} shadow='md' radius={"xl"} h={ isMobile ? 500 : 300}>
      <Flex p={isMobile ? 0 : ""} w={"100%"} h={"100%"} direction={isMobile ? "column" : "row"} gap={"lg"}>
        <Image radius={"md"} w={300} height={230} fit='cover' withPlaceholder src={project.imageUrl || project.orgLogoUrl} />
        <Flex w={"100%"} h={"100%"} direction={"column"} align={"center"}>
          <Group mb={"sm"} w={"100%"} position='center'>
            <Badge
              variant='light'
              size={isMobile ? "md" : 'lg'}
              color={fetchCorrectStatusOption("orange", "red", "green")}>
              {fetchCorrectStatusOption("Pending Approval", "Rejected", "Approved")}
            </Badge>
            <IconHelp to={"/"} color='gray' />
          </Group>
          <Title order={2}> <Text sx={{ transition: "all 200ms ease-in-out" }} to={`/projects/${project.id}`} component={Link}>{project.title}</Text></Title>
          <Text mt={isMobile ? 0 : "xs"}>By: {project.orgUrl ? <Text to={project.orgUrl} component={Link}>{project.orgName}</Text> : `${project.orgName}`}</Text>
          <Text
            sx={() => ({justifySelf : "end"})}
          size={"sm"}
          mt={"auto"}
          color='dimmed'>Posted: {project.createdAt ? fetchPrettyTime(project.createdAt) : "N/A"}</Text>
        </Flex>
        {/* </Flex> */}
      </Flex>
    </Paper>
  )
}


function MyProjects() {
  const [myProjects, setMyProjects] = useState<undefined | VolunteerProjectProp[]>(undefined) // use undefined state to denote loading
  const { isValidVolunteer, user } = useContext(AuthenticationContext);
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const queryForm = useForm<QueryProps>({
    initialValues: {
      search: "",
      tags: [],
      timeRange: "Year"
    }
  });
  const searchMyProjects = async () => {
    // fetches project using the query form 
    apiClient.fetchAllInterestedProjects().then(({ data, success, statusCode, error }: ApiResponseProp) => {
      if (success) {
        console.log("fetched all interseted for volunteer successfully: ", data)
        setMyProjects(data);
      } else {
        // display error notification? (stretch)
        console.log("Unable to fetch volunteer data", `error: ${error} code: ${statusCode}`);
      }
    }).catch((error) => {
      console.log("a very unexpeced error has occured: ", error)
    });
    console.log("fetchingProjects");
  }
  useEffect(() => {
    searchMyProjects()
  }, [user]);

  /**
   * @todo: 
   * use 2? tabs to show projects volunteers is approved for, interested in to show projects a student is interested in
   * use simple card list layout
   * give volunteers option to remove interest from projects
   */
  return !isValidVolunteer ? <NotAuthorized /> : (
    <>
            <Title fz={ isMobile ?  40 : 50} pl={isMobile ? "xl" :  "sm"} py={isMobile ? "md" : "xs"} order={1} c={"violet.8"} align='left'>Your Projects</Title>
      <Divider size={"md"} color='violet.2' h={"xl"} />
      <Paper shadow={"md"} radius={"md"}>
        <Group>
          <QueryBar {...queryForm} />
          <Button onClick={() => { setMyProjects(undefined); searchMyProjects(); }} variant='light'>Search Filter</Button>
        </Group>
      </Paper>
      <Container px={isMobile ? 0 : "md"} mt={"xl"} ml={"auto"} mr={"auto"} maw={ isMobile ? "100vw" :  "80vw"}>
          {myProjects?.length ? myProjects?.map((project: VolunteerProjectProp) => {
            console.log("maping projects: ", project)
            return (
              <SlimProjectCard key={`${project.createdAt}`} {...project} />
            )
          }) :
            <NoneFound title='No Projects Found....' />
          }
      </Container>
    </>
  );
}

export default MyProjects