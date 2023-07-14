import { Button, Text, Group, Title, Container } from "@mantine/core";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <Container className="landing-page-container">
      <Title order={1}
        align="center">
        Connecting Students with Orgs
      </Title>
      <Text>
        small blurb about what we do
      </Text>
      <Group>
        <Button component={Link} to={"/signup"}>Sign Up</Button>
        <Button component={Link} to={"/login"}>Login</Button>
      </Group>
    </Container>
  )
}
