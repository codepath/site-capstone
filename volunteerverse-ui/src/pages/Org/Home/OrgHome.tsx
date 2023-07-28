import React, { useContext, useEffect, useState } from 'react'
import { useAuthenticationUserProp } from '../../../services/hooks/useAuthentication'
import {
  ActionIcon, Badge, Button,
  Container, Flex, Group, Paper, Skeleton,
  Title, useMantineTheme, Text, Image
} from '@mantine/core'
import { QueryBar, QueryProps } from '../../../components/QueryBar';
import { useForm } from '@mantine/form';
import NotAuthorized from '../../NotAuthorized';
import { Link, useNavigate } from 'react-router-dom';
import NoneFound from '../../../components/NoneFound';
import { projectDetailsData } from '../../Volunteer/Home/data';
import { VolunteerProjectProp } from '../../../props/projects';
import { ApiResponseProp, apiClient } from '../../../services/ApiClient';
import { AuthenticationContext } from '../../../context/AuthenicationContext';

function SlimProjectCard(project: VolunteerProjectProp) {
  // use for org projects too
  const openMenu = () => {
    console.log("this is where menu opens")
  }
  const theme = useMantineTheme();
  return (
    <Paper sx={(theme) => ({
      "&:hover": { "transform": "scale(1)", boxShadow: `${theme.shadows.xl}` },
      transform: "scale(0.99)",
      transition: "all 300ms ease-in-out"
    })} p={"md"} shadow='md' radius={"xl"} h={200}>
      <Group noWrap={true}>
        <Image width={200} fit='cover' withPlaceholder src={project.imageUrl} />
        <Flex direction={"column"} h={"100%"} justify={"space-between"} >
          <ActionIcon onClick={openMenu} radius={"xl"} sx={(theme) => ({ position: "relative", zIndex: 1000, alignSelf: "flex-end" })}>
            <Text component='span' className='material-symbols-outlined'>more_vert</Text>
          </ActionIcon>

          <Group position="left">
            <Title> <Text sx={{ transition: "all 200ms ease-in-out" }} to={`/projects/${project.id}`} component={Link}>{project.title}</Text></Title>
            <Text>Posted: {project.createdAt}</Text>
            {/* <Text>By: {<Text to={project.orgUrl} component={Link}>{project.orgName}</Text>}</Text> */}
          </Group>
          <Group>
            <Badge color={project.approved ? theme.colors.orange[4] : theme.colors.green[4]}>{project.approved ? "approved" : "pending approval"}</Badge>
          </Group>
        </Flex>
      </Group>
    </Paper>
  )
}

function OrgHome() {
  const [postedProjects, setPostedProjects] = useState<VolunteerProjectProp[] | undefined>(undefined);
  const {isAuth, user, } = useContext(AuthenticationContext);
  const navigate = useNavigate();
  const queryForm = useForm<QueryProps>({
    initialValues: {
      search: "",
      tags: [],
      timeRange: "Year"
    }
  });

  const searchPostedProjects = () => {
    console.log("gettting org projects here");
    if (user) {
      apiClient.fetchProjects(user.userType).then(({ success, statusCode, data, error }: ApiResponseProp) => {
        if (success) {
          console.log("successfully receieved posted projects", data);
          setPostedProjects(data.orgProjects)
        } else {
          // maybe set state for an error message
          console.log("an error occcured sending a request to fetch all projects", error);
        }
      }).catch((error) => {
        console.log("something very unexpected has occured while trying to search for project from an organization", error)
      })
    } else {
      console.log("user is undefined", user)
    }
    // setPostedProjects([projectDetailsData, projectDetailsData, projectDetailsData]);
  }
  useEffect(() => {
    searchPostedProjects();
  }, [])
  /**
   * @todo - display dashboard for orgs to view/create/delete projects they've posted
   */
  return !(isAuth && user?.userType === "organization") ? <NotAuthorized /> : (
    <>
      <Title align='left'>My Projects</Title>
      <Paper shadow={"md"} radius={"md"}>
        <Skeleton visible={postedProjects === undefined}>
          <Group>
            <QueryBar {...queryForm} />
            <Button onClick={() => { setPostedProjects(undefined); searchPostedProjects() }} variant='light'>Search Filter</Button>
          </Group>
        </Skeleton>
      </Paper>
      <Button onClick={() => navigate("/projects/create")} variant='filled' radius={"xl"} size={"xl"}>Create Project</Button>
      <Container ml={"auto"} mr={"auto"} maw={1000}>
        <Skeleton visible={postedProjects === undefined}>
          <Flex mt={"xl"} gap={"xl"} direction={"column"}>
            {postedProjects?.length ? postedProjects?.map((project: VolunteerProjectProp, index: number) => {
              return (
                <SlimProjectCard key={`${project.createdAt}`} {...project} />
              )
            }) :
              <NoneFound title='Post a project to see it here!' />
            }
          </Flex>
        </Skeleton>
      </Container>
    </>
  )
}

export default OrgHome