import { gql } from "@apollo/client";

export const GET_CURRENT_USER = gql`
  query {
    CurrentUser {
      id
      username
      password
      signInCount
      createdAt
      updatedAt
      refreshToken
    }
  }
`;
