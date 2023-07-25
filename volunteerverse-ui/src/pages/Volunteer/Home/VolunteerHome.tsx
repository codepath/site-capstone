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
import { useEffect, useState } from "react";


function VolunteerHome({ user }: { user: useAuthenticationUserProp }) {
  /**
   * @todo: implement loader when fecthing user projects
   */
  const { email } = user;
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

  return (
    <>
      <Title>Welcome Back {email}!</Title>
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
  )
}

export default VolunteerHome