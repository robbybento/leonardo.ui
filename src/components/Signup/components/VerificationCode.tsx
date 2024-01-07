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
import { confirmSignUp } from "aws-amplify/auth";
import { UserContext } from "../../../providers/UserProvider";

interface Props {
  onBack: () => void;
  onNext: () => void;
}

interface ChangeProps {
  target: { value: SetStateAction<string> };
}

export default function VerificationCode({ onBack, onNext }: Props) {
  const [formError, setFormError] = useState("");
  const userContext = useContext(UserContext);
  const [isVerifiying, setIsVerifying] = useState(false);

  const handleCodeChange = (e: ChangeProps) => {
    userContext.setUser((user: any) => ({
      ...user,
      code: e.target.value,
    }));
  };

  return (
    <VStack spacing={5}>
      <FormControl isRequired>
        <FormLabel>Verification Code</FormLabel>
        <Input
          type="text"
          value={userContext.user?.code || ""}
          onChange={handleCodeChange}
        />
      </FormControl>

      {formError && (
        <Alert status="error">
          <AlertIcon />
          {formError}
        </Alert>
      )}

      <Alert status="info">
        <AlertIcon />
        Please enter the code sent to your email address below
      </Alert>

      <HStack>
        <Button onClick={onBack}>Back</Button>
        <Button
          isLoading={isVerifiying}
          colorScheme="blue"
          variant="outline"
          onClick={async () => {
            setIsVerifying(true);
            const user = userContext.user;
            if ((user.code || '').length > 5) {
              try {
                const { isSignUpComplete } = await confirmSignUp({
                  username: userContext.user.username || "",
                  confirmationCode: userContext.user.code || "",
                });
                onNext();
              } catch (error: any) {
                setFormError(error.message);
                setIsVerifying(false);
              }
            } else {
              setFormError("Please enter all fields correctly");
              setIsVerifying(false);
            }
          }}
        >
          Next
        </Button>
      </HStack>
    </VStack>
  );
}
