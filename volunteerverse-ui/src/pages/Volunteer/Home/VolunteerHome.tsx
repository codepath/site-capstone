import { Carousel } from "@mantine/carousel";
import {
  Button,
  Title,
  useMantineTheme
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


function VolunteerHome() {
  /**
   * @todo: implement loader when fecthing user projects
   */
  const { user, isValidVolunteer } = useContext(AuthenticationContext);
  const [volunteerProjects, setVolunteerProjects] = useState<ProjectCardProps[] | undefined>(undefined);

  const fetchProjects = async () => {
    // fetches project using the query form 
    apiClient.fetchProjects("volunteer", queryForm.values).then(({ data, success, statusCode, error }: ApiResponseProp) => {
      if (success) {
        console.log("fetched recommended projects for volunteer successfully: ", data)
        setVolunteerProjects(data);
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
  const queryForm = useForm<QueryProps>({
    initialValues: {
      search: "",
      tags: [],
      timeRange: "Year"
    }
  });

  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const projectCardSlides = volunteerProjects?.map((item) => (
    <Carousel.Slide key={item.title}>
      <ProjectCard {...item} />
    </Carousel.Slide>
  ));

  return isValidVolunteer ? (
    <>
      <Title>{`Welcome ${ user?.userType === "volunteer" ? user.firstName : ""}! `}</Title>
      <QueryBar {...queryForm} />
      <Button size="lg" radius={"md"} compact onClick={fetchProjects}>Search Projects</Button>
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
          <NoneFound title="No projects found" />
      }
    </>
  ) : <NotAuthorized />
}

export default VolunteerHome