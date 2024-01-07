import { SetStateAction, useContext, useState } from "react";
import {
  Input,
  FormControl,
  FormLabel,
  Alert,
  AlertIcon,
  VStack,
  Button,
  HStack,
} from "@chakra-ui/react";
import { UserContext } from "../../../providers/UserProvider";
import { signUp } from "aws-amplify/auth";

interface Props {
  onBack: () => void;
  onNext: () => void;
}

interface ChangeProps {
  target: { value: SetStateAction<string> };
}

export default function JobDetail({ onBack, onNext }: Props) {
  const [formError, setFormError] = useState("");
  const userContext = useContext(UserContext);
  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleJobTitleChange = (e: ChangeProps) => {
    userContext.setUser((user: any) => ({
      ...user,
      jobTitle: e.target.value,
    }));
  };

  return (
    <VStack spacing={5}>
      <FormControl isRequired>
        <FormLabel>Job Title</FormLabel>
        <Input
          type="text"
          value={userContext.user?.jobTitle || ""}
          onChange={handleJobTitleChange}
        />
      </FormControl>

      {formError && (
        <Alert status="error">
          <AlertIcon />
          {formError}
        </Alert>
      )}

      <HStack>
        <Button onClick={onBack}>Back</Button>
        <Button
          isLoading={isSigningUp}
          colorScheme="blue"
          variant="outline"
          onClick={async () => {
            setIsSigningUp(true);
            const user = userContext.user;
            if (user.jobTitle?.length) {
              try {
                const { isSignUpComplete, userId, nextStep } = await signUp({
                  username: user.username || "",
                  password: user.password || "",
                  options: {
                    userAttributes: {
                      email: (user.email || "").toLowerCase(),
                      name: "",
                      nickname: user.jobTitle || "",
                    },
                    autoSignIn: true,
                  },
                });
                onNext();
              } catch (error: any) {
                setIsSigningUp(false);
                setFormError(error.message);
              }
            } else {
              setFormError("Please enter all fields correctly");
              setIsSigningUp(false);
            }
          }}
        >
          Next
        </Button>
      </HStack>
    </VStack>
  );
}
