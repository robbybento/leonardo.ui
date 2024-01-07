"use client";
import { useContext } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  VStack,
} from "@chakra-ui/react";
import { Amplify } from "aws-amplify";
import amplifyConfig from "../../amplifyconfiguration.json";
import { UserContext } from "../../providers/UserProvider";

Amplify.configure(amplifyConfig);

interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  country: any;
}

export default function Country({ isOpen, onClose, onOpen, country }: Props) {
  const userContext = useContext(UserContext);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {country?.emoji} {country?.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={5}>
              {country && (
                <>
                  <FormControl isReadOnly>
                    <FormLabel>Code</FormLabel>
                    {country.code}
                  </FormControl>

                  <FormControl isReadOnly>
                    <FormLabel>Capital</FormLabel>
                    {country.capital}
                  </FormControl>

                  <FormControl isReadOnly>
                    <FormLabel>Currency</FormLabel>
                    {country.currency}
                  </FormControl>

                  <FormControl isReadOnly>
                    <FormLabel>Phone</FormLabel>+{country.phone}
                  </FormControl>
                </>
              )}

              <Button
                colorScheme="blue"
                variant="outline"
                onClick={() => {
                  onClose();
                }}
              >
                Close
              </Button>
            </VStack>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
