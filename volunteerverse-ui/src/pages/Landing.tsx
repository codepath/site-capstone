import { Button, Text, Group, Title } from "@mantine/core";

export default function Landing() {
  return (
    <div className="landing-page-container">
      <Title
        order={1}
        align="center">
        Connecting Students with Orgs
      </Title>
      <Group>
        <Button>Sign Up</Button>
        <Button>Login</Button>
      </Group>
    </div>
  )
}
