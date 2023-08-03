import { useContext, useEffect, useState } from 'react'
import {
  Badge, Button,
  Container, Flex, Group, Paper, Skeleton,
  Title, useMantineTheme, Text, Image
} from '@mantine/core'
import { QueryBar, QueryProps } from '../../../components/QueryBar';
import { useForm } from '@mantine/form';
import NotAuthorized from '../../NotAuthorized';
import { Link, useNavigate } from 'react-router-dom';
import NoneFound from '../../../components/NoneFound';
import { VolunteerProjectProp } from '../../../props/projects';
import { ApiResponseProp, apiClient } from '../../../services/ApiClient';
import { AuthenticationContext } from '../../../context/AuthenicationContext';
import { fetchPrettyTime, notify } from '../../../utility/utility';
import ProjectOptionsMenu from './ProjectOptionsMenu';
import { notifications } from '@mantine/notifications';

function SlimProjectCard({project, handleDelete}: {project: VolunteerProjectProp, handleDelete: ({ projectId } : {projectId :  number}) => void}) {
  // use for org projects too
  const [projectStatus, setProjectStatus] = useState(project.active)
  const toggleProjectActiveStatus = () => {
    /**
     * @description: toggles status state of a project between on and off
     */
    apiClient.toggleProjectStatus({projectId :  project.id}).then(({success, data, statusCode, error}) => {
        if (success) {
          setProjectStatus(data.active)
          project.active = data.active;
            // change project active state here
        } else{
            console.log("error while toggling project active status : ", error)
            notify.error(); // shows error notification
        }
    }).catch((error) => {
        console.log("a really unexpected error occured: ", error)
    })
    console.log("toggling projects status state")
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
          <ProjectOptionsMenu isActive={projectStatus} projectId={project.id} handleArchiveToggle={toggleProjectActiveStatus} handleDelete={handleDelete}/>
          <Group position="left">
            <Title> <Text sx={{ transition: "all 200ms ease-in-out" }} to={`/projects/${project.id}`} component={Link}>{project.title}</Text></Title>
            <Text color='dimmed'>Posted: { project.createdAt ? fetchPrettyTime(project.createdAt) : "N/A"}</Text>
          </Group>
          <Group>
            <Badge color={!project.active ? `orange.6` : `green.6`}>{project.active ? "active" : "archived"}</Badge>
          </Group>
        </Flex>
      </Group>
    </Paper>
  )
}

function OrgHome() {
  
  const [postedProjects, setPostedProjects] = useState<VolunteerProjectProp[] | undefined>(undefined);
  const {isValidOrg, user, } = useContext(AuthenticationContext);
  const navigate = useNavigate();
  const queryForm = useForm<QueryProps>({
    initialValues: {
      search: "",
      tags: [],
      timeRange: "Year"
    }
  });
  const deleteProject = ({ projectId: deleteProjectId } : {projectId :  number}) => {
    apiClient.deleteProject({projectId :  deleteProjectId}).then(({success, data, statusCode, error}) => {
        if (success) {
          setPostedProjects((initialProject) => initialProject?.filter((project) =>  project.id !== deleteProjectId))
          console.log("deleting project")
            // change project active state here
        } else{
            console.log("error while toggling project active status : ", error)
            notify.error(); // shows error notification
        }
    }).catch((error) => {
        console.log("a really unexpected error occured while trying to delete a project", error)
    })
    console.log("deleting projects...");
  }

  const searchPostedProjects = () => {
    console.log("gettting org projects here");
    if (user) {
      apiClient.fetchProjects(user.userType, queryForm.values).then(({ success, statusCode, data, error }: ApiResponseProp) => {
        if (success) {
          console.log("successfully receieved posted projects", data);
          setPostedProjects(data.orgProjects)
        } else {
          // maybe set state for an error message
          
          setPostedProjects([])
          console.log("an error occcured sending a request to fetch all projects", error);
        }
      }).catch((error) => {
        console.log("something very unexpected has occured while trying to search for project from an organization", error)
      })
    } 
  }
  useEffect(() => {
    searchPostedProjects();
  }, [])
  return !(isValidOrg) ? <NotAuthorized /> : (
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
                <SlimProjectCard project={project} handleDelete={deleteProject} key={`${project.createdAt}`} />
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