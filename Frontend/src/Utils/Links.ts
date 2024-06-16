import { REFRESH_TOKENS_MUTATION } from "@/GraphQL/Mutation/Auth.Mutation";
import { ApolloLink, HttpLink, Observable, Operation } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { client } from "./ApolloProvider";
import AuthStore from "@/Stores/Auth.Store";
import { toast } from "react-toastify";

//! TODO: FIXME: In Production, change the uri to the deployed server and save it in .env file
const httpLink = new HttpLink({ uri: "http://localhost:4000/graphql" });

const getTokens = () => {
  const accessToken = AuthStore.getState().accessToken ?? "";
  const refreshToken = AuthStore.getState().refreshToken ?? "";

  return { accessToken, refreshToken };
};

const authLink = setContext((__, { headers }) => {
  const { accessToken } = getTokens();
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${accessToken}`,
    },
  };
});

const requiresAuth = (operation: Operation) => {
  return operation.getContext().requiresAuth;
};

const refreshLink = new ApolloLink((operation, forward) => {
  return new Observable((observer) => {
    let handle: any;

    const { refreshToken } = getTokens();
    const isRetry = operation.getContext().__retry;

    if (!requiresAuth(operation) || isRetry) {
      return forward(operation).subscribe(observer);
    }

    const handleResponse = (response: any) => {
      const { errors } = response;
      if (errors && response.errors.some((err: any) => err.message === "Unauthorized")) {
        client
          .mutate({
            mutation: REFRESH_TOKENS_MUTATION,
            variables: { refreshToken },
          })
          .then(({ data }) => {
            const { accessToken, refreshToken } = data.refreshTokens;
            AuthStore.getState().setTokens({ accessToken, refreshToken });

            operation.setContext({
              headers: {
                ...operation.getContext().headers,
                authorization: `Bearer ${accessToken}`,
              },
              __retry: true,
            });

            const subscriber = forward(operation).subscribe(
              handleResponse,
              observer.error.bind(observer),
              observer.complete.bind(observer)
            );
            if (subscriber) handle.unsubscribe();
          })
          .catch((refreshError) => {
            AuthStore.getState().clearTokens();
            window.location.href = "/login";
            observer.error(refreshError);
          });
      } else {
        observer.next(response);
        observer.complete();
      }
    };

    const handleError = (error: any) => {
      toast.error(error.message);
      AuthStore.getState().clearTokens();
      window.location.href = "/login";
    };

    handle = forward(operation).subscribe(handleResponse, handleError);

    return () => {
      if (handle) handle.unsubscribe();
    };
  });
});

export const link = ApolloLink.from([refreshLink, authLink, httpLink]);
