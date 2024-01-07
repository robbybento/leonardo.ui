"use client";
import { useContext } from "react";
import { HStack, Flex, Spacer, Stack, Text, Heading } from "@chakra-ui/react";
import Signup from "../Signup";
import Signin from "../Signin";
import Profile from "../Profile";
import Signout from "../Signout";
import { UserContext } from "../../providers/UserProvider";

export default function Header() {
  const userContext = useContext(UserContext);

  return (
    <>
      <Flex padding={5}>
        <Stack spacing={0}>
          <Heading fontSize={18} color="dark">
            Leonardo
          </Heading>
          <Text fontSize={12} color="gray">
            A global app
          </Text>
        </Stack>
        <Spacer />
        <HStack>
          {userContext.user.signedIn ? (
            <>
              <Profile />
              <Signout />
            </>
          ) : (
            <>
              <Signin />
              <Signup />
            </>
          )}
        </HStack>
      </Flex>
    </>
  );
}
