import {
  Badge,
  Box,
  Button,
  Container, Divider,
  Flex,
  Group, Image,
  LoadingOverlay,
  Text,
  Title,
  createStyles,
  useMantineTheme
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { VolunteerProjectProp } from "../../../props/projects";
import { apiClient } from "../../../services/ApiClient";
import { AuthenticationContext } from "../../../context/AuthenicationContext";
import { fetchPrettyTime } from "../../../utility/utility";
import NotAuthorized from "../../NotAuthorized";



const useStyles = createStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: `calc(${theme.spacing.xl} * 1.5)`,
    alignItems: "center",
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

function OrgProjectDetails() {
  const { isValidOrg } = useContext(AuthenticationContext)
  const params = useParams();
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const { projectId } = params;
  const { classes } = useStyles();

  const [project, setProject] = useState<VolunteerProjectProp | undefined>(projectId ? {
    title: "",
    createdAt: undefined,
    description: "",
    orgName: "",
    orgUrl: "",
    imageUrl: "",
    orgDescription: "",
    founders: "",
    tags: [],
    interested: false,
    approved: false,
    id: -1,
    active: false,
    orgPublicNumber: "",
    orgPublicEmail: "",
    orgLogoUrl: "",

  } : undefined);
  
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
    fetchProjectById();
  }, []);
  console.log("project : ", project)
  return (project === undefined || !isValidOrg) ? <NotAuthorized /> : (
    <Box p={0} m={0}>
      <Container px={isMobile ? 0 : "md"}>
        <Flex gap={isMobile ? "sm" : "md"} direction={"column"} w={"100%"} align={"center"}>
          <Image radius={"xl"} withPlaceholder src={project?.imageUrl} width={isMobile ? "100%" : "100%"} height={isMobile ? 300 : 500} />
          <Group variant="filled" >
            <Text size="lg" color="dimmed" fw={700}>Tags: </Text>
            {project?.tags.map((tag) => {
              return (
                <Badge className={classes.tag} key={tag} variant="light" size={isMobile ? "lg" : "xl"} >{tag}</Badge>
              )
            })}
          </Group>
        </Flex>

        {/* <Flex align={"start"} direction={"column"} className={classes.textContent} w={"100%"}> */}
        <div>
          <Title mt={"xl"} align="center" order={1}>{project?.title}</Title>
          <Title align="center" p={isMobile ? "xs" : "sm"} order={4}>by {project.orgUrl === "" ? `${project?.orgName}` : <Link to={project.orgUrl}>{project?.orgName}</Link>}</Title>
          <Text mb={"xl"} color="dimmed" align="center">Posted: {project.createdAt ? fetchPrettyTime(project.createdAt) : "N/A"}</Text>
        </div>
        <Divider my={"lg"} />
        <div>
          <Title align="start" order={2}>Project Description:</Title>
          <Text align="left" p={isMobile ? "xs" : "sm"}>{project?.description}</Text>
        </div>
        <Divider my={"lg"} />
        <div>
          <Title align="left" order={2}>About {project?.orgName}:</Title>
          <Title mt="xs" fw={450} pl={isMobile ? "md" : "xs"} ta={"left"} order={5}>Founder(s): {project.founders.replace(",", ", ")}</Title>
          <Title mt="md" fw={450} pl={isMobile ? "md" : "xs"} ta={"left"} order={5}>Description:</Title>
          <Text align="left" p={isMobile ? "xs" : "lg"}>{project?.orgDescription}</Text>
        </div>
        <div>
          <Title my={"sm"} align="left" fw={500} order={3}>Contact:</Title>

          {project.orgPublicEmail && <Text ml={"sm"} p={isMobile ? "xs" : "sm"} align="left">Email: <Link to={`mailto:${project.orgPublicEmail}`}>{project.orgPublicEmail}</Link></Text>}
          {project.orgPublicNumber && <Text ml={"sm"} p={isMobile ? "xs" : "sm"} align="left">Phone: <Link to={`tel:+${project.orgPublicNumber}`}>{project.orgPublicNumber}</Link></Text>}
          <Divider my={"lg"} />
        </div>
        <Button
          variant="light"
          radius={"lg"}
          size={isMobile ? "md" : "lg"}
          component={Link}
          to="/">Return Home</Button>
      </Container>
      <LoadingOverlay visible={project?.title === ""} radius={"xl"} overlayBlur={2} overlayOpacity={0.9} loaderProps={{ size: "xl" }} />
    </Box>

  )
}
export default OrgProjectDetails;