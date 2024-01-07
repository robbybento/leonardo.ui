import { gql } from "@apollo/client";

export const listCountries = gql`
  {
    countries {
      code
      name
      emoji
      capital
      currency
      phone
    }
  }
`;
