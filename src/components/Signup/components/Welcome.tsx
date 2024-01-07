import { Heading, Text, VStack, Button } from "@chakra-ui/react";

interface Props {
  onNext: () => void;
}

export default function Welcome({ onNext }: Props) {
  return (
    <VStack spacing={5}>
      <Heading color="dark" fontSize={24} textAlign="center">Welcome</Heading>
      <Text align="center">
        Please complete the steps to access the country information.
      </Text>
      <Button colorScheme="blue" variant="outline" onClick={onNext}>
        Next
      </Button>
    </VStack>
  );
}
