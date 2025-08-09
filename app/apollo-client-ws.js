import { split, HttpLink } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_API_ENDPOINT || process.env.API_ENDPOINT,
  headers: {
    'x-api-key': process.env.NEXT_PUBLIC_API_KEY || process.env.API_KEY,
  },
});

const wsLink = typeof window !== 'undefined' ? new GraphQLWsLink(createClient({
  url: (process.env.NEXT_PUBLIC_API_ENDPOINT || process.env.API_ENDPOINT).replace('https://', 'wss://'),
  connectionParams: {
    'x-api-key': process.env.NEXT_PUBLIC_API_KEY || process.env.API_KEY,
  },
})) : null;

const splitLink = typeof window !== 'undefined' && wsLink ? split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
) : httpLink;

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;
export { ApolloProvider };
