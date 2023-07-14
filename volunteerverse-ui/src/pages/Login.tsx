import { Button, Container, Text, Title } from "@mantine/core"
import { Link } from "react-router-dom";
import GoBackButton from "../components/GoBackButton";

export default function Login() {
  console.log("first");
  return (
    <Container>
      <Title>
        Login
      </Title>
      <GoBackButton />
    </Container>
  )
}
