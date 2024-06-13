import { gql } from "@apollo/client";

const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($username: String, $password: String) {
    UpdateUser(updateUserInput: { username: $username, password: $password }) {
      accessToken
      refreshToken
    }
  }
`;

export { UPDATE_USER_MUTATION };
