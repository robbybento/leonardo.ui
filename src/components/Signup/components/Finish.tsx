import { Heading, Text, VStack, Button } from "@chakra-ui/react";

interface Props {
  
  onFinish: () => void;
}

export default function Finish({ onFinish }: Props) {
  return (
    <VStack spacing={5}>
      <Heading textAlign="center">Congratulations!</Heading>
      <Text align="center">User created successfully. Please Sign In with your username and password.</Text>
      <Button colorScheme="blue" variant="outline" onClick={onFinish}>
        Finish
      </Button>
    </VStack>
  );
}
