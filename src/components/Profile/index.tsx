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
} from "@chakra-ui/react";
import { Amplify } from "aws-amplify";
import { updateUserAttribute } from "aws-amplify/auth";
import amplifyConfig from "../../amplifyconfiguration.json";
import { UserContext } from "../../providers/UserProvider";
import { User } from "../../icons";

Amplify.configure(amplifyConfig);

interface ChangeProps {
  target: { value: SetStateAction<string> };
}

export default function Profile() {
  const userContext = useContext(UserContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formError, setFormError] = useState(false);

  const handleJobTitleChange = (e: ChangeProps) => {
    userContext.setUser((user: any) => ({
      ...user,
      jobTitle: e.target.value,
    }));
  };

  return (
    <>
      <Button size='sm' colorScheme="blue" variant="outline" onClick={onOpen}>
        <User />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={5}>
              <FormControl isReadOnly>
                <FormLabel>Username</FormLabel>
                <Input type="text" value={userContext.user?.username || ''} />
              </FormControl>

              <FormControl isReadOnly>
                <FormLabel>Email</FormLabel>
                <Input type="text" value={userContext.user?.email || ''} />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Job Title</FormLabel>
                <Input
                  type="text"
                  value={userContext.user?.jobTitle || ''}
                  onChange={handleJobTitleChange}
                />
              </FormControl>

              <Alert status="info">
                <AlertIcon />
                Only Job Title can be changed.
              </Alert>

              {formError && (
                <Alert status="error">
                  <AlertIcon />
                  Please enter all fields correctly
                </Alert>
              )}

              <Button
                colorScheme="blue"
                variant="outline"
                onClick={async () => {
                  const user = userContext.user;
                  if (!user.jobTitle) setFormError(true);
                  else {
                    const output = await updateUserAttribute({
                      userAttribute: {
                        attributeKey: "nickname",
                        value: user.jobTitle,
                      },
                    });
                    onClose();
                  }
                }}
              >
                Save
              </Button>
            </VStack>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
