import { REFRESH_TOKENS_MUTATION } from "@/GraphQL/Mutation/Auth.Mutation";
import { ApolloLink, HttpLink, Observable } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { jwtDecode } from "jwt-decode";
import { client } from "./ApolloProvider";
import AuthStore from "@/Stores/Auth.Store";

const authLink = setContext((__, { headers }) => {
  const accessToken = localStorage.getItem("accessToken");
  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  };
});

const refreshLink = new ApolloLink((operation, forward) => {
  return new Observable((observer) => {
    let handle: any;
    Promise.resolve(operation)
      .then((operation) => {
        const { requiresAuth } = operation.getContext();

        if (!requiresAuth) {
          return forward(operation);
        }
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        if (!accessToken || !refreshToken) {
          window.location.href = "/login";
          return;
        }

        const decodedToken: any = jwtDecode(accessToken);
        const isTokenExpired = decodedToken.exp * 1000 < Date.now();

        if (isTokenExpired) {
          // Ensure client is defined before using it
          return client
            .mutate({
              mutation: REFRESH_TOKENS_MUTATION,
              variables: { refreshToken },
            })
            .then(({ data }) => {
              const { refreshTokens } = data;
              AuthStore.getState().setTokens(refreshTokens);
              operation.setContext(({ headers = {} }) => ({
                headers: {
                  ...headers,
                  authorization: `Bearer ${refreshTokens.accessToken}`,
                },
              }));

              return forward(operation);
            })
            .catch(() => {
              AuthStore.getState().clearTokens();
              throw new Error("Token refresh failed");
            });
        } else {
          operation.setContext(({ headers = {} }) => ({
            headers: {
              ...headers,
              authorization: `Bearer ${accessToken}`,
            },
          }));
          return forward(operation);
        }
      })
      .then((observable) => {
        handle = observable?.subscribe({
          next: observer.next.bind(observer),
          error: observer.error.bind(observer),
          complete: observer.complete.bind(observer),
        });
      })
      .catch(observer.error.bind(observer));

    return () => {
      if (handle) handle.unsubscribe();
    };
  });
});

//! TODO: FIXME: In Production, change the uri to the deployed server and save it in .env file
const httpLink = new HttpLink({ uri: "http://localhost:4000/graphql" });

export const link = ApolloLink.from([refreshLink, authLink, httpLink]);
