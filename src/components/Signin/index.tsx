"use client";
import { useState, useContext, SetStateAction } from "react";
import {
  Button,
  AlertIcon,
  FormControl,
  FormLabel,
  Alert,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { Amplify } from "aws-amplify";
import { getCurrentUser, signIn, fetchUserAttributes } from "aws-amplify/auth";
import amplifyConfig from "../../amplifyconfiguration.json";
import { UserContext } from "../../providers/UserProvider";

Amplify.configure(amplifyConfig);

interface ChangeProps {
  target: { value: SetStateAction<string> };
}

export default function Index() {
  const userContext = useContext(UserContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formError, setFormError] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleUsernameChange = (e: ChangeProps) => {
    userContext.setUser((user: any) => ({
      ...user,
      username: e.target.value,
    }));
  };
  const handlePasswordChange = (e: ChangeProps) => {
    userContext.setUser((user: any) => ({
      ...user,
      password: e.target.value,
    }));
  };

  return (
    <>
      <Button
      size='sm'
        colorScheme="blue"
        variant="outline"
        onClick={() => {
          userContext.setUser((user: any) => ({
            ...user,
            username: "",
            password: "",
          }));
          setFormError("");
          onOpen();
        }}
      >
        Login
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={5}>
              <FormControl isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  value={userContext.user?.username || ""}
                  onChange={handleUsernameChange}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={userContext.user?.password || ""}
                  onChange={handlePasswordChange}
                />
              </FormControl>

              {formError && (
                <Alert status="error">
                  <AlertIcon />
                  {formError}
                </Alert>
              )}
              <HStack>
                <Button
                  colorScheme="blue"
                  variant="outline"
                  isLoading={isSigningIn}
                  onClick={async () => {
                    setIsSigningIn(true);
                    const user = userContext.user;
                    if (user.username && user.password) {
                      try {
                        const signedIn = await signIn({
                          username: userContext.user.username || "",
                          password: userContext.user.password || "",
                        });
                        const user = await getCurrentUser();
                        const attributes = await fetchUserAttributes();
                        userContext.setUser({
                          username: user.username,
                          email: attributes.email || "",
                          jobTitle: attributes.nickname || "",
                          password: "",
                          code: "",
                          signedIn: true,
                        });
                        setIsSigningIn(false);
                        onClose();
                      } catch (error: any) {
                        setIsSigningIn(false);
                        setFormError(error.message);
                      }
                    } else {
                      setIsSigningIn(false);
                      setFormError("Please enter all fields correctly");
                    }
                  }}
                >
                  Login
                </Button>
                <Button onClick={() => onClose()}>Close</Button>
              </HStack>
            </VStack>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
