import { gql } from "@apollo/client";

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(loginUserInput: { username: $username, password: $password }) {
      accessToken
      refreshToken
    }
  }
`;

export { LOGIN_MUTATION };
