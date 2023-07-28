import { Carousel } from "@mantine/carousel";
import {
  useMantineTheme,
  Title, Button
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { createStyles } from "@mantine/styles";
import { projectCardData } from "./data";
import { useAuthenticationUserProp } from "../../../services/hooks/useAuthentication";
import ProjectCard from "./ProjectCard";
import { QueryBar, QueryProps } from "../../../components/QueryBar";
import { useForm } from "@mantine/form";
import { useContext, useEffect, useState } from "react";
import NotAuthorized from "../../NotAuthorized";
import { AuthenticationContext } from "../../../context/AuthenicationContext";


function VolunteerHome() {
  /**
   * @todo: implement loader when fecthing user projects
   */
  const { isAuth, user } = useContext(AuthenticationContext);
  console.log(isAuth, user)

  const fetchProjects = async () => {
    console.log("fetchingProjects")
  }
  useEffect(() => { fetchProjects() }, [])
  const queryForm = useForm<QueryProps>({
    initialValues: {
      search: "",
      tags: [],
      timeRange: "Year"
    }
  });

  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const projectCardSlides = projectCardData.map((item) => (
    <Carousel.Slide key={item.title}>
      <ProjectCard {...item} />
    </Carousel.Slide>
  ));

  return (isAuth && user?.userType === "volunteer") ? (
    <>
      <Title>Welcome Back</Title>
      <QueryBar {...queryForm} />
      <Button size="lg" radius={"md"} compact onClick={fetchProjects}>Search Projects</Button>
      <Carousel
        controlSize={isMobile ? 40 : 70}
        withIndicators
        slideSize="80%"
        breakpoints={[{ maxWidth: 'sm', slideSize: '100%', slideGap: 2 }]}
        slideGap="xl"
        align={"center"}
        slidesToScroll={isMobile ? 1 : 2}
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
        }
      >
        {projectCardSlides}
      </Carousel>
    </>
  ) : <NotAuthorized />
}

export default VolunteerHome