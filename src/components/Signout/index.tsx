"use client";
import { useContext } from "react";
import { Button } from "@chakra-ui/react";
import { Amplify } from "aws-amplify";
import { signOut } from "aws-amplify/auth";
import amplifyConfig from "../../amplifyconfiguration.json";
import { UserContext } from "../../providers/UserProvider";
import { Power } from "../../icons";

Amplify.configure(amplifyConfig);

export default function Signout() {
  const userContext = useContext(UserContext);

  return (
    <>
      <Button
        size='sm'
        colorScheme="blue"
        variant="outline"
        onClick={async () => {
          await signOut();
          userContext.setUser({
            username: "",
            email: "",
            jobTitle: "",
            password: "",
            code: "",
            signedIn: false,
          });
        }}
      >
        <Power />
      </Button>
    </>
  );
}
