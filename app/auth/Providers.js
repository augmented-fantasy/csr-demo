'use client';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Authenticator } from "@aws-amplify/ui-react";

const client = new ApolloClient({
  uri: process.env.API_ENDPOINT,
  cache: new InMemoryCache(),
});

export default function Providers({ children }) {
  return (
    <Authenticator>
      <ApolloProvider client={client}>
        {children}
      </ApolloProvider>
    </Authenticator>
  );
}