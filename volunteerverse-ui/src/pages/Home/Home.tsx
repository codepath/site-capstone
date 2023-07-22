import { Text } from "@mantine/core";
import useAuthentication from "../../services/hooks/useAuthentication";
import { useEffect } from "react";

function Home() {
    const [isAuth, user] = useAuthentication();
    console.log(user)

    return (
        <Text>Home</Text>
        // isAuth && (userType === "organization" ? (<Text>Org</Text>) : (<Text>Volunteer</Text>))
    )
}

export default Home