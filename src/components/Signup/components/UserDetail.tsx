import { SetStateAction, useState, useContext } from "react";
import {
  Input,
  AlertIcon,
  FormControl,
  FormLabel,
  Alert,
  VStack,
  Button,
} from "@chakra-ui/react";
import { UserContext } from "../../../providers/UserProvider";

interface Props {
  onNext: () => void;
}

interface ChangeProps {
  target: { value: SetStateAction<string> };
}

export default function UserDetail({ onNext }: Props) {
  const userContext = useContext(UserContext);
  const [formError, setFormError] = useState("");

  const handleUsernameChange = (e: ChangeProps) => {
    userContext.setUser((user: any) => ({
      ...user,
      username: e.target.value,
    }));
  };
  const handleEmailChange = (e: ChangeProps) => {
    userContext.setUser((user: any) => ({
      ...user,
      email: e.target.value,
    }));
  };
  const handlePasswordChange = (e: ChangeProps) => {
    userContext.setUser((user: any) => ({
      ...user,
      password: e.target.value,
    }));
  };

  return (
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
        <FormLabel>Email</FormLabel>
        <Input
          type="text"
          value={userContext.user?.email || ""}
          onChange={handleEmailChange}
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

      <Alert status="info">
        <AlertIcon />
        Password must be at least 8 characters and at least one digit, one
        upper and one lower
      </Alert>

      {formError && (
        <Alert status="error">
          <AlertIcon />
          {formError}
        </Alert>
      )}

      <Button
        colorScheme="blue"
        variant="outline"
        onClick={() => {
          const user = userContext.user;
          if (user.username?.length && user.email?.length && user.password?.length) {
            if (
              !/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
                user.email || ""
              )
            ) {
              setFormError("Not a valid Email address");
            } else if (
              !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(
                user.password || ""
              )
            ) {
              setFormError("Not a valid password");
            } else onNext();
          } else setFormError("Please enter all fields correctly");
        }}
      >
        Next
      </Button>
    </VStack>
  );
}
