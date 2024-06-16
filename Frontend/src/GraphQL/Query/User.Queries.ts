import { gql } from "@apollo/client";

export const GET_CURRENT_USER = gql`
  query getCurrentUser {
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
