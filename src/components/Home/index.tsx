"use client";
import { useContext, useState } from "react";
import { Button, Text, Heading } from "@chakra-ui/react";
import Countries from "../Countries";
import { UserContext } from "../../providers/UserProvider";
import { Globe } from "../../icons";

export default function Home() {
  const userContext = useContext(UserContext);
  const [showCountries, setShowCountries] = useState(false);

  return (
    <>
      {userContext.user.signedIn ? (
        <>
          <Heading fontSize={18} color="dark">
            Welcome to Leonardo, {userContext.user.username}
          </Heading>
          <Text pb={10}>
            This App will let you explore countries as well as specfic
            information about that country.
          </Text>
          <Button
            leftIcon={<Globe />}
            colorScheme="blue"
            variant="outline"
            onClick={() => setShowCountries(true)}
          >
            Countries
          </Button>
        </>
      ) : (
        <>
          {" "}
          <Heading fontSize={18} color="dark">
            Welcome to Leonardo
          </Heading>
          <Text pb={10}>
            This App will let you explore countries as well as specfic
            information about that country.
          </Text>
        </>
      )}
      {userContext.user.signedIn && showCountries && <Countries />}
    </>
  );
}
