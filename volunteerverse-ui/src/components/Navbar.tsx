import { Button, Header, Group, Text, Container, Image } from "@mantine/core";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png"
export default function Navbar() {

  return (
    <Header height={60}>
      <Container style={{display: "flex", flexDirection : "row"}}>
        <Group>
          <Text component={Link} to="/signup">Sign Up</Text>
          <Text component={Link} to="/login">Login</Text>
        </Group>
        <Link to={"/"}>
          <Image src={Logo} width={50} height={50} />
        </Link>
      </Container>
    </Header>
  )
}
