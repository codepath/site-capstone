import { useContext, useEffect, useState } from 'react'
import {
  Paper, Title, Text,
  Container, Group, Image,
  Badge, useMantineTheme, Button,
  Skeleton,
  Flex,
  ActionIcon
} from '@mantine/core';
import { Link } from 'react-router-dom';
import { QueryBar, QueryProps } from '../../components/QueryBar';
import { useForm } from '@mantine/form';
import NotAuthorized from '../NotAuthorized';
// import { projectDetailsData } from './Home/data';
import NoneFound from '../../components/NoneFound';
import { VolunteerProjectProp } from '../../props/projects';
import { AuthenticationContext } from '../../context/AuthenicationContext';
import { ApiResponseProp, apiClient } from '../../services/ApiClient';
import { fetchPrettyTime } from '../../utility/utility';

function SlimProjectCard(project: VolunteerProjectProp) {
  // use for org projects too
  const openMenu = () => {
    console.log("this is where menu opens");
    // console.log("rendering project: ", project)
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
            <Badge color={project.approved ? theme.colors.orange[4] : theme.colors.green[4]}>{project.approved === true ? "approved" : project.approved === false ? "rejected" : "pending approval"}</Badge>
            <Text>Posted: {project.createdAt ? fetchPrettyTime(project.createdAt) :  "N/A"}</Text>
          </Group>
        </Flex>
      </Group>
    </Paper>
  )
}


function MyProjects() {
  const [myProjects, setMyProjects] = useState<undefined | VolunteerProjectProp[]>(undefined) // use undefined state to denote loading
  const {isValidVolunteer, user} = useContext(AuthenticationContext);

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
      <Title align='left'>My Projects</Title>
        <Paper shadow={"md"} radius={"md"}>
        <Skeleton visible={myProjects === undefined}>
          <Group>
            <QueryBar {...queryForm} />
            <Button onClick={ () => {setMyProjects(undefined); searchMyProjects();}} variant='light'>Search Filter</Button>
          </Group>
        </Skeleton>
        </Paper>
      <Container ml={"auto"} mr={"auto"}  maw={800}>
        <Skeleton visible={myProjects === undefined}>
          <Flex mt={"xl"} gap={"xl"} direction={"column"}>
          {myProjects?.length ? myProjects?.map((project: VolunteerProjectProp, index: number) => {
            console.log("maping projects: ", project)
            return (
              <SlimProjectCard key={`${project.createdAt}`} {...project} />
            )
          }) :
            <NoneFound title='No Projects Found....' />
          }
          </Flex>
        </Skeleton>
      </Container>
    </>
  );
}




export default MyProjects