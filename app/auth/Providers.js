'use client';

import { Authenticator } from "@aws-amplify/ui-react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  split,
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

const graphqlEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

const getWebSocketUrl = (graphqlEndpoint) => {
  const url = new URL(graphqlEndpoint);
  return `wss://${url.hostname.replace('appsync-api', 'appsync-realtime-api')}/graphql`;
};

const websocketUrl = getWebSocketUrl(graphqlEndpoint);

const httpLink = new HttpLink({
  uri: graphqlEndpoint,
  headers: {
    'x-api-key': apiKey,
  },
});

const wsLink = new GraphQLWsLink(
  createClient({
    uri: websocketUrl,
    connectionParams: {
      'x-api-key': apiKey,
    },
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_ENDPOINT,
  link: splitLink,
  cache: new InMemoryCache(),
  headers: {
    'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
  }
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