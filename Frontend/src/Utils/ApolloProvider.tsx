import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { ReactNode } from "react";
import { link } from "./Links";

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
const ApolloAppProvider = ({ children }: { children: ReactNode }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
export default ApolloAppProvider;
