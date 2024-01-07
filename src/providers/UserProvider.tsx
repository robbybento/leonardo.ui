"use client";
import {
  useState,
  useEffect,
  createContext,
  SetStateAction,
  Dispatch,
} from "react";
import { User } from "../interfaces/User";
import { getCurrentUser, fetchUserAttributes } from "aws-amplify/auth";

interface Props {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}

const UserContext = createContext<Props>({
  user: {
    username: "",
    email: "",
    jobTitle: "",
    password: "",
    code: "",
    signedIn: false,
  } as User,
  setUser: () => {},
});

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>({
    username: "",
    email: "",
    jobTitle: "",
    password: "",
    code: "",
    signedIn: false,
  });

  useEffect(() => {
    async function init() {
      try {
        const user = await getCurrentUser();
        const attributes = await fetchUserAttributes();
        setUser({
          username: user.username,
          email: attributes.email || "",
          jobTitle: attributes.nickname || "",
          password: "",
          code: "",
          signedIn: true,
        });
      } catch (error) {
        console.log(error);
      }
    }
    init();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
