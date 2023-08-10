import { Carousel } from "@mantine/carousel";
import {
  Button,
  Divider,
  Title,
  createStyles,
  useMantineTheme,
  Text,
  Loader
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { useContext, useEffect, useState } from "react";
import NoneFound from "../../../components/NoneFound";
import { QueryBar, QueryProps } from "../../../components/QueryBar";
import { AuthenticationContext } from "../../../context/AuthenicationContext";
import { ApiResponseProp, apiClient } from "../../../services/ApiClient";
import NotAuthorized from "../../NotAuthorized";
import ProjectCard, { ProjectCardProps } from "./ProjectCard";

const useStyles = createStyles((theme) => ({
  root : {
    padding: `0 calc(${theme.spacing.xl} * 1.5)`,
  }
}))

function VolunteerHome() {
  /**
   * @todo: implement loader when fecthing user projects
   */
  const { user, isValidVolunteer } = useContext(AuthenticationContext);
  const [volunteerProjects, setVolunteerProjects] = useState<ProjectCardProps[] | undefined>(undefined);
  const [projectsLoading, setProjectsLoading] = useState(false);

  const fetchProjects = async () => {
    setProjectsLoading(true);
    // fetches project using the query form 
    apiClient.fetchProjects("volunteer").then(({ data, success, statusCode, error }: ApiResponseProp) => {
      if (success) {
        setProjectsLoading(false);
        console.log("fetched recommended projects for volunteer successfully: ", data)
        setVolunteerProjects(data.reverse());
        // setVolunteerProjects(projectCardData)
      } else {
        setVolunteerProjects([]);
        // display error notification? (stretch)
        console.log("Unable to fetch volunteer data", `error: ${error} code: ${statusCode}`);
      }
    }).catch((error) => {
      console.log("a very unexpeced error has occured: ", error)
    });
    console.log("fetchingProjects");
  }
  useEffect(() => { fetchProjects() }, [user]) // fetch projects

  const fetchFilteredProjects = async (query: string, tags: string[]) => {
    if (query.trim().length == 0 && tags.length == 0){
      fetchProjects()
    }
    if (query.trim().length > 0 && tags.length == 0){
    apiClient.searchProjectsByTitle(query).then(({ data, success, statusCode, error }: ApiResponseProp) => {
      if (success) {
        console.log("fetched filtered projects for volunteer successfully: ", data)
        setVolunteerProjects(data);
        // setVolunteerProjects(projectCardData)
      } else {
        setVolunteerProjects([]);
        // display error notification? (stretch)
        console.log("Unable to fetch volunteer data", `error: ${error} code: ${statusCode}`);
      }
    }).catch((error) => {
      console.log("a very unexpected error has occured: ", error)
    });
  }

  if (query.trim().length == 0 && tags.length > 0){
    let projects: ProjectCardProps[] = []
    const apiCalls = tags.map((tag: string) => {
      return apiClient.filterProjectsByTag(tag)
        .then(({ data, success, statusCode, error }: ApiResponseProp) => {
          if (success) {
            console.log("Fetched filtered projects for volunteer successfully: ", data);
            projects.push(...data); // Use spread operator to push array elements
          } else {
            // Display error notification? (stretch)
            console.log("Unable to fetch volunteer data", `error: ${error} code: ${statusCode}`);
          }
        })
        .catch((error) => {
          console.log("A very unexpected error has occurred: ", error);
        });
    });
    
    Promise.all(apiCalls)
    .then(() => {
      const result = new Set(projects);
      const uniqueProjects = Array.from(result);
      console.log("Unique projects: ", uniqueProjects);
      setVolunteerProjects(uniqueProjects);
    })
    .catch((error) => {
      console.log("Error in API calls: ", error);
    });
  }
  if (query.trim().length > 0 && tags.length > 0){
    apiClient.filterProjectsSearchFilter(tags,query).then(({ data, success, statusCode, error }: ApiResponseProp) => {
      if (success) {
        console.log("fetched filtered projects for volunteer successfully: ", data)
        setVolunteerProjects(data);
        // setVolunteerProjects(projectCardData)
      } else {
        setVolunteerProjects([]);
        // display error notification? (stretch)
        console.log("Unable to fetch volunteer data", `error: ${error} code: ${statusCode}`);
      }
    }).catch((error) => {
      console.log("a very unexpected error has occured: ", error)
    });
  }

  
}

  
  useEffect(() => {fetchFilteredProjects(queryForm.values.search, queryForm.values.tags)}, [user]) // fetch projects
  


  const queryForm = useForm<QueryProps>({
    initialValues: {
      search: "",
      tags: [],
      timeRange: "Year"
    }
  });

  const { classes } = useStyles();

  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  const projectCardSlides = volunteerProjects?.map((item) => (
    <Carousel.Slide key={item.title}>
      <ProjectCard {...item} />
    </Carousel.Slide>
  ));

  return isValidVolunteer ? (
    <>

    <div className={classes.root}>
      <Title fz={48} pl={isMobile ? "xl" :  "sm"} py={isMobile ? "md" : "xs"} order={1} align='left'>Welcome <Text c={"violet.7"} component="span">{user?.userType === "volunteer" ? user.firstName : ""}</Text> </Title>
      <Divider size={"md"} color='violet.2' h={"xl"} />
      <QueryBar {...queryForm} />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Button size={isMobile ? "md" : "xl"} m={isMobile ? "xs" : "md"} radius={"xl"} variant="outline"  onClick={() => fetchFilteredProjects(queryForm.values.search, queryForm.values.tags)}>Search Projects</Button>
       {projectsLoading && <Loader color="violet" size="lg" variant="dots" />}
       </div>
      {
        volunteerProjects && volunteerProjects?.length > 0 ? <Carousel
          controlSize={isMobile ? 40 : 70}
          withIndicators
          slideSize="80%"
          breakpoints={[{ maxWidth: 'sm', slideSize: '100%', slideGap: 2 }]}
          slideGap="xl"
          align={"center"}
          slidesToScroll={1}
          styles={
            {
              root: { maxWidth: 1500, marginLeft: "auto", marginRight: "auto" },
              control: {
                backgroundColor: theme.colors.violet[1],
                transform: "scale(0.99)",
                transition: "all 200ms ease-in-out",
                "&:hover": { transform: "scale(1)", shadow: theme.shadows.md }
              }
            }
          }>

          {projectCardSlides}
        </Carousel> :
          null
      }
      {!projectsLoading && volunteerProjects && volunteerProjects.length === 0 && (
  <NoneFound title="No projects found" />
)}
    </div>
    </>
  ) : <NotAuthorized />
}

export default VolunteerHome