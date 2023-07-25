import React, { useEffect, useState } from 'react'
import { useAuthenticationUserProp } from '../../services/hooks/useAuthentication'
import {
  Paper, Tabs, Title, Text,
  Box, Container, Group, Image,
  Badge, useMantineTheme, Button,
  Skeleton,
  Flex,
  ActionIcon
} from '@mantine/core';
import { ProjectProp } from './VolunteerProjectDetails';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { QueryBar, QueryProps } from '../../components/QueryBar';
import { useForm } from '@mantine/form';
import NotAuthorized from '../NotAuthorized';
import { projectDetailsData } from './Home/data';

function SlimProjectCard(project: ProjectProp) {
  const openMenu = () => {
    console.log("this is where menu opens")
  }
  const theme = useMantineTheme();
  return (
    <Paper sx={ (theme) =>({ 
      "&:hover" : {"transform" : "scale(1)", boxShadow: `${theme.shadows.xl}`},
      transform: "scale(0.99)",
      transition: "all 300ms ease-in-out"
      })} p={"md"} shadow='md' radius={"xl"} h={200}>
      <Group noWrap={true}>
        <Image width={200} fit='cover' withPlaceholder src={project.imageUrl} />
        <Flex direction={"column"} h={"100%"} justify={"space-between"} >
        <ActionIcon onClick={openMenu} radius={"xl"} sx={ (theme) => ({ position:"relative", zIndex: 1000, alignSelf: "flex-end" })}>
          <Text component='span' className='material-symbols-outlined'>more_vert</Text>
        </ActionIcon>

          <Group position="left">
            <Title> <Text sx={{transition : "all 200ms ease-in-out"}} to={`/projects/${project.id}`} component={Link}>{project.title}</Text></Title>
            <Text>By: {<Text to={project.orgUrl} component={Link}>{project.orgName}</Text>}</Text>
          </Group>
          <Group>
            <Badge color={project.approved ? theme.colors.orange[4] : theme.colors.green[4]}>{project.approved ? "approved" : "pending approval"}</Badge>
            <Text>Posted: {project.createdAt}</Text>
          </Group>
        </Flex>
      </Group>
    </Paper>
  )
}


function MyProjects({ isAuth, user }: { isAuth: boolean, user: useAuthenticationUserProp }) {
  const [myProjects, setMyProjects] = useState<undefined | ProjectProp[]>(undefined)

  const queryForm = useForm<QueryProps>({
    initialValues: {
      search: "",
      tags: [],
      timeRange: "Year"
    }
  });
  const searchMyProjects = async () => {
    console.log("searching/setting my projects using query form ");
    setMyProjects([projectDetailsData, projectDetailsData, projectDetailsData]);
  }
  useEffect(() => {
    console.log("fetching myprojects, call searchMyProjects here");
    searchMyProjects()
  }, [])
  console.log("nothing to see here");
  /**
   * @todo: 
   * use 2? tabs to show projects volunteers is approved for, interested in to show projects a student is interested in
   * use simple card list layout
   * give volunteers option to remove interest from projects
   */
  return !(isAuth && user.userType === "volunteer") ? <NotAuthorized /> : (
    <>
      <Title align='left'>My Projects</Title>
        <Paper shadow={"md"} radius={"md"}>
        <Skeleton visible={myProjects === undefined}>
          <Group>
            <QueryBar {...queryForm} />
            <Button onClick={ () => {setMyProjects(undefined); searchMyProjects()}} variant='light'>Search Filter</Button>
          </Group>
        </Skeleton>
        </Paper>
      <Container ml={"auto"} mr={"auto"}  maw={800}>
        <Skeleton visible={myProjects === undefined}>
          <Flex mt={"xl"} gap={"xl"} direction={"column"}>
          {myProjects?.length ? myProjects?.map((project: ProjectProp, index: number) => {
            return (
              <SlimProjectCard key={`${project.createdAt}`} {...project} />
            )
          }) :
            <NoneFound />
          }
          </Flex>
        </Skeleton>
      </Container>
    </>
  );
}


function NoneFound() {
  return (
    <Title>
      No Projects Found
    </Title>
  )
}

export default MyProjects