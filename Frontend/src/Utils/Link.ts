import { HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const authLink = setContext((_, { headers }) => {
  const accessToken = localStorage.getItem("accessToken");
  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  };
});

//! TODO: FIXME: In Production, change the uri to the deployed server and save it in .env file
const httpLink = new HttpLink({ uri: "http://localhost:4000/graphql" });

export const link = authLink.concat(httpLink);
