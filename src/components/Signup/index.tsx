"use client";
import { useState, useContext } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Welcome,
  Finish,
  UserDetail,
  JobDetail,
  VerificationCode,
} from "./components/index";
import { UserContext } from "../../providers/UserProvider";
import { Amplify } from "aws-amplify";
import amplifyConfig from "../../amplifyconfiguration.json";

Amplify.configure(amplifyConfig);

export default function Index() {
  const userContext = useContext(UserContext);
  const [section, setSection] = useState<
    "welcome" | "user-detail" | "job-detail" | "verification" | "finish"
  >("welcome");
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
      size='sm'
        colorScheme="blue"
        variant="outline"
        onClick={() => {
          setSection("welcome");
          userContext.setUser((user: any) => ({
            ...user,
            username: "",
            password: "",
            email: "",
            jobTitle: "",
            code: "",
          }));
          onOpen();
        }}
      >
        Register
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Register</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {section == "welcome" && (
              <Welcome
                onNext={() => {
                  setSection("user-detail");
                }}
              />
            )}

            {section == "user-detail" && (
              <UserDetail
                onNext={() => {
                  setSection("job-detail");
                }}
              />
            )}

            {section == "job-detail" && (
              <JobDetail
                onBack={() => setSection("user-detail")}
                onNext={async () => {
                  setSection("verification");
                }}
              />
            )}

            {section == "verification" && (
              <VerificationCode
                onBack={() => setSection("job-detail")}
                onNext={async () => setSection("finish")}
              />
            )}

            {section == "finish" && <Finish onFinish={() => onClose()} />}
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
