"use client";
import { useContext, useState } from "react";
import { Container } from "@chakra-ui/react";
import Home from "../components/Home";
import Header from "../components/Header";
import { UserContext } from "../providers/UserProvider";

export default function Page() {
  const userContext = useContext(UserContext);
  const [showCountries, setShowCountries] = useState(false);

  return (
    <>
      <Header />
      <Container>
        <Home />
      </Container>
    </>
  );
}
