import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { apiClient } from "../../services/ApiClient";
import {
  Badge, Container, Divider,
  Group, Image, Title, Text,
  useMantineTheme,
  createStyles,
  LoadingOverlay,
  Skeleton,
  Button,
  Flex,
  Box
} from "@mantine/core";
import { notifications } from '@mantine/notifications';
import NotAuthorized from "../NotAuthorized";
import { projectDetailsData } from "./Home/data";
import GoBackButton from "../../components/GoBackButton";
import { VolunteerProjectProp } from "../../props/projects";
import { AuthenticationContext } from "../../context/AuthenicationContext";
import { fetchPrettyTime } from "../../utility/utility";



const useStyles = createStyles((theme) => ({
  container: {
    // display: "flex",
    // flexDirection: "column",
    // gap: `calc(${theme.spacing.xl} * 1.5)`,
    // alignItems: "center",
    // height: "100%"
  },
  textContent: {

  },
  tag: {
    zIndex: 2,
    transform: "scale(0.99)",
    transition: "all 200ms ease-in-out",
    "&:hover": {
      transform: "scale(1)",
      boxShadow: theme.shadows.md,
      cursor: "pointer"
    }
  }

}))

function VolunteerProjectDetails() {
  const {isValidOrg} = useContext(AuthenticationContext)
  const params = useParams();
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const [buttonIsLoading, { open: showLoadingButton, close: hideLoadingButton }] = useDisclosure(false);
  const { projectId } = params;
  const { classes } = useStyles();

  const [project, setProject] = useState<VolunteerProjectProp | undefined>(projectId ? {
    title: "",
    createdAt: undefined,
    description: "",
    orgName: "",
    orgUrl: "",
    imageUrl: "",
    orgDesc: "",
    founders: "",
    tags: [""],
    interested: false,
    approved: false,
    id: -1
  } : undefined);
  const toggleProjectInterest = () => {
    // updates intersted_volunteers database table with 
    // the volunteer's interest
    showLoadingButton();
    if (projectId) {
      apiClient.updateProjectInterestByUser(projectId).then((response) => {
        const { data, success, statusCode, error } = response;
        if (success) {
          console.log("updating interested from ", project?.interested, " to ", !project?.interested)
          console.log("toggling user interest", data);
          // toggles interest for a volunteer user
          setProject((initialData) => {
            if (initialData) {
              return {
                ...initialData,
                interested: !initialData.interested
              }
            }
            return undefined
          });
          hideLoadingButton();
        } else {
          console.log("error status code: ", statusCode);
          console.log('unable to update users interest.', error);
          notifications.show({
            autoClose: 3000,
            color: "red",
            title: 'Uh-oh!',
            message: "An error occured. Please try again later ",
          })
          hideLoadingButton();
        }
      })
    };
  }
  useEffect(() => {
    // fecthes project by id and updates state variable 
    // if successful

    console.log("found project id: ", projectId)
    const fetchProjectById = async () => {
      if (projectId) {
        const { data, success, statusCode, error } = await apiClient.fetchProjectById(projectId);
        if (success) {
          // update projects if successful
          console.log("found project", data);
          setProject(data);
        } else if (statusCode === 400) {
          // set project to undefined if unsuccessful (status code is only 400 when project is not found)
          setProject(undefined)
        } else {
          // same as above, but just for error logging
          console.log("an unexpected error occured: ", error)
        }
      }
    }
    /**
     * @todo: connect to backend
     */
    setProject(projectDetailsData);
    fetchProjectById();
  }, []);
  console.log("project : ", project)
  return (project === undefined || !isValidOrg ) ? <NotAuthorized /> : (
    <Box p={0} m={0}>
      <GoBackButton mb={"md"} w={"100%"} maw={200} />
        <Container className={classes.container} px={isMobile ? 0 : "md"}>
          <Flex gap={isMobile ? "sm" : "md"} direction={"column"} w={"100%"} align={"center"}>
            <Image radius={"xl"} withPlaceholder src={project?.imageUrl} width={isMobile ? "100%" : "100%"} height={isMobile ? 300 : 500} />
            <Group variant="filled" >
              {project?.tags.map((tag) => {
                return (
                  <Badge className={classes.tag} key={tag} variant="light" size={isMobile ? "lg" : "xl"} >{tag}</Badge>
                )
              })}
            </Group>
          </Flex>
          <Button
          // styles={{root: { ':active': { backgroundColor: project.interested ? `${theme.colors.green[6]}` : `${theme.colors.violet[7]}` }}}}
             maw={400} radius={"lg"}
            size={isMobile ? "lg" : "xl"} compact sx={{
              // border: "none",
              color: project.interested ? `${theme.white}` : `${theme.colors.violet[7]}`,
              transition: "all 100ms ease-in-out"
            }}
            variant={project.interested ? `filled` : `outline`}
            loading={buttonIsLoading}
            onClick={toggleProjectInterest}
            my={"xl"}
            >
            {project.interested ? "Remove Interest" : "Express Interest"}</Button>

          {/* <Flex align={"start"} direction={"column"} className={classes.textContent} w={"100%"}> */}
          <div>
            <Title mt={"xl"} align="center" order={1}>{project?.title}</Title>
            <Title align="center" p={isMobile ? "xs" : "sm"} order={4}>by {!project.orgUrl ? `${project?.orgName}` : <Link to={project.orgUrl}>{project?.orgName}</Link>}</Title>
            <Text mb={"xl"} color="dimmed" align="center">Posted: {project.createdAt ? fetchPrettyTime(project.createdAt) :  "N/A"}</Text>
          </div>
           <Divider my={"lg"}/>
          <div>
            <Title align="start" order={2}>Description:</Title>
            <Text align="left" p={isMobile ? "xs" : "sm"}>{project?.description}</Text>
          </div>
            <Divider my={"lg"} />
            <div>
            <Title align="left" order={2}>About {project?.orgName}:</Title>
            <Text align="left" p={isMobile ? "xs" : "sm"}>{project?.orgDesc}</Text>

            </div>
           <Divider my={"lg"} />
          {/* go back button? */}
        </Container>
      <LoadingOverlay visible={project?.title === ""} radius={"xl"} overlayBlur={2} overlayOpacity={0.9} loaderProps={{ size: "xl" }} />
    </Box>

  )
}

export default VolunteerProjectDetails