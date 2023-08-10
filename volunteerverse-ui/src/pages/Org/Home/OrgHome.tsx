import {
  Badge, Button,
  Container, Divider, Flex, Group,
  Image,
  Paper, Skeleton,
  Text,
  Title,
  createStyles,
  useMantineTheme
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NoneFound from '../../../components/NoneFound';
import { QueryBar, QueryProps } from '../../../components/QueryBar';
import { AuthenticationContext } from '../../../context/AuthenicationContext';
import { VolunteerProjectProp } from '../../../props/projects';
import { ApiResponseProp, apiClient } from '../../../services/ApiClient';
import { fetchPrettyTime, notify } from '../../../utility/utility';
import NotAuthorized from '../../NotAuthorized';
import ProjectOptionsMenu from './ProjectOptionsMenu';
import { useMediaQuery } from '@mantine/hooks';
import { IconHelp } from '@tabler/icons-react';

function SlimProjectCard({ project, handleDelete }: { project: VolunteerProjectProp, handleDelete: ({ projectId }: { projectId: number }) => void }) {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const [projectStatus, setProjectStatus] = useState(project.active)
  const toggleProjectActiveStatus = () => {
    /**
     * @description: toggles status state of a project between on and off
     */
    apiClient.toggleProjectStatus({ projectId: project.id }).then(({ success, data, statusCode, error }) => {
      if (success) {
        setProjectStatus(data.active)
        project.active = data.active;
        // change project active state here
      } else {
        console.log("error while toggling project active status : ", statusCode, error)
        notify.error(); // shows error notification
      }
    }).catch((error) => {
      console.log("a really unexpected error occured: ", error)
    })
    console.log("toggling projects status state")
  }

  return (
    
    <Paper
    w={"100%"}
    sx={(theme) => ({
      "&:hover": { "transform": "scale(1)", boxShadow: `${theme.shadows.xl}` },
      transform: "scale(0.99)",
      transition: "all 300ms ease-in-out"
    })} m={ isMobile ? 0 : "md"} p={isMobile ? 0 :"lg"} shadow='md' radius={"xl"} h={ isMobile ? 500 : 300}>
      <Flex p={isMobile ? 0 : ""} w={"100%" } h={"100%"} direction={isMobile ? "column" : "row"} gap={"lg"}>

        <Image radius={"md"} w={300} height={230} fit='cover' withPlaceholder src={project.imageUrl || project.orgLogoUrl} />
        <Flex w={"100%"} h={"100%"} direction={"column"} align={"center"}>
          <Group mb={"sm"} w={"100%"} position='center'>
            <ProjectOptionsMenu isActive={projectStatus} projectId={project.id} handleArchiveToggle={toggleProjectActiveStatus} handleDelete={handleDelete} />
          </Group>
          <Title order={2}> <Text sx={{ transition: "all 200ms ease-in-out" }} to={`/projects/${project.id}`} component={Link}>{project.title}</Text></Title>
         <Group mt={isMobile ? "sm" : "xs"}>
          <Badge
              variant='light'
              size={isMobile ? "md" : 'lg'}
              color={!project.active ? `orange.6` : `green.6`}>
              {project.active ? "active" : "archived"}
            </Badge>
          <IconHelp to={"/"} color='gray'/>
         </Group>
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

// function SlimProjectCard2({ project, handleDelete }: { project: VolunteerProjectProp, handleDelete: ({ projectId }: { projectId: number }) => void }) {
//   // use for org projects too
//   const [projectStatus, setProjectStatus] = useState(project.active)
//   const toggleProjectActiveStatus = () => {
//     /**
//      * @description: toggles status state of a project between on and off
//      */
//     apiClient.toggleProjectStatus({ projectId: project.id }).then(({ success, data, statusCode, error }) => {
//       if (success) {
//         setProjectStatus(data.active)
//         project.active = data.active;
//         // change project active state here
//       } else {
//         console.log("error while toggling project active status : ", statusCode, error)
//         notify.error(); // shows error notification
//       }
//     }).catch((error) => {
//       console.log("a really unexpected error occured: ", error)
//     })
//     console.log("toggling projects status state")
//   }

//   return (
//     <Paper sx={(theme) => ({
//       "&:hover": { "transform": "scale(1)", boxShadow: `${theme.shadows.xl}` },
//       transform: "scale(0.99)",
//       transition: "all 300ms ease-in-out"
//     })} p={"md"} shadow='md' radius={"xl"} h={200}>
//       <Group noWrap={true}>
//         <Image width={200} fit='cover' withPlaceholder src={project.imageUrl} />
//         <Flex direction={"column"} h={"100%"} justify={"space-between"} >
//           <ProjectOptionsMenu isActive={projectStatus} projectId={project.id} handleArchiveToggle={toggleProjectActiveStatus} handleDelete={handleDelete}/>
//           <Group position="left">
//             <Title> <Text sx={{ transition: "all 200ms ease-in-out" }} to={`/projects/${project.id}`} component={Link}>{project.title}</Text></Title>
//             <Text color='dimmed'>Posted: { project.createdAt ? fetchPrettyTime(project.createdAt) : "N/A"}</Text>
//           </Group>
//           <Group>
//             <Badge color={!project.active ? `orange.6` : `green.6`}>{project.active ? "active" : "archived"}</Badge>
//           </Group>
//         </Flex>
//       </Group>
//     </Paper>
//   )
// }

const useStyles = createStyles((theme) => ({
  root :{
    padding: `calc(${theme.spacing.xl})`
  }
}))

function OrgHome() {
  
  const [postedProjects, setPostedProjects] = useState<VolunteerProjectProp[] | undefined>(undefined);
  const {isValidOrg, user, } = useContext(AuthenticationContext);
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const { classes } = useStyles();
  const navigate = useNavigate();
  const queryForm = useForm<QueryProps>({
    initialValues: {
      search: "",
      tags: [],
      timeRange: "Year"
    }
  });
  const deleteProject = ({ projectId: deleteProjectId } : {projectId :  number}) => {
    apiClient.deleteProject({projectId :  deleteProjectId}).then(({success, statusCode, error}) => {
        if (success) {
          setPostedProjects((initialProject) => initialProject?.filter((project) =>  project.id !== deleteProjectId))
          console.log("deleting project")
            // change project active state here
        } else{
            console.log("error while toggling project active status : ",statusCode, error)
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
      apiClient.fetchProjects(user.userType).then(({ success, statusCode, data, error }: ApiResponseProp) => {
        if (success) {
          console.log("successfully receieved posted projects", data);
          setPostedProjects(data.orgProjects.reverse())
        } else {
          // maybe set state for an error message
          
          setPostedProjects([])
          console.log("an error occcured sending a request to fetch all projects", statusCode, error);
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
    <div className={classes.root}>
      <Title fz={48} pl={isMobile ? "xl" :  "sm"} py={isMobile ? "md" : "xs"} order={1} c={"violet.8"} align='left'>Your Projects</Title>
      <Divider size={"md"} color='violet.2' h={"xl"} />
      <Paper shadow={"md"} radius={"md"}>
        <Skeleton visible={postedProjects === undefined}>
          <Group>
            <QueryBar {...queryForm} />
            <Button onClick={() => { setPostedProjects(undefined); searchPostedProjects() }} variant='light'>Search Filter</Button>
          </Group>
        </Skeleton>
      </Paper>
      <Button my={"xl"} onClick={() => navigate("/projects/create")} variant='outline' radius={"xl"} size={ isMobile ? "md" : "xl"}>Create Project</Button>
      <Container ml={"auto"} mr={"auto"} maw={1000}>
        <Skeleton visible={postedProjects === undefined}>
          <Flex gap={"xl"} direction={"column"}>
            {postedProjects?.length ? postedProjects?.map((project: VolunteerProjectProp) => {
              return (
                <SlimProjectCard project={project} handleDelete={deleteProject} key={`${project.id}`} />
                )
              }) :
              <NoneFound title='Post a project to see it here!' />
            }
          </Flex>
        </Skeleton>
      </Container>
            </div>
  )
}

export default OrgHome