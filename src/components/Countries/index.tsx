"use client";
import { useState } from "react";
import { ApolloClient, InMemoryCache, useQuery } from "@apollo/client";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useDisclosure,
  Heading,
  Show,
} from "@chakra-ui/react";
import { listCountries } from "./queries";
import Country from "../Country";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://countries.trevorblades.com",
});

export default function Countries() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [country, setCountry] = useState();
  const { data, loading, error } = useQuery(listCountries, { client });

  return (
    <>
      <Heading color="dark" paddingBottom={5} paddingTop={5}>Countries</Heading>
      <TableContainer>
        <Table variant="striped" colorScheme="blue" size="sm">
          <TableCaption>Countries</TableCaption>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Show above="sm">
                <Th>Capital</Th>
              </Show>
            </Tr>
          </Thead>
          <Tbody>
            {data &&
              data.countries.map((country: any, index: number) => (
                <Tr
                  key={index}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setCountry(country);
                    onOpen();
                  }}
                >
                  <Td>
                    {country.emoji} {country.name}
                  </Td>
                  <Show above="sm">
                    <Td>{country.capital}</Td>
                  </Show>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Country
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        country={country}
      />
    </>
  );
}
