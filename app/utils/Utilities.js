import { generateClient } from "aws-amplify/data";
import { Amplify } from 'aws-amplify';
import { useQuery, useSubscription } from '@apollo/client';
import outputs from '@/amplify_outputs.json';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { GET_USERS, ON_CREATE_USER } from "./Constants";
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  split,
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

const graphqlEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
Amplify.configure(outputs);
const client = generateClient()

export const SubscribeToUserChange = () => {
  return useSubscription(ON_CREATE_USER);
}

export const getAvatar = () => {
  return (Math.floor(Math.random() * 11) + 1).toString();
}

export const mapSubscriptions = (purchases) => {
  let color = 'primary';
  let value = "";
  const items = purchases?.vehicle?.map((purchase, idx) => {
    switch (purchases?.subscription[idx]) {
      case 0:
        color = 'primary';
        value = purchases?.product[0] || "";
        break;
      case 1:
        color = 'secondary';
        value = purchases?.product[1] || "";
        break;
      default:
        color = 'default';
        value = purchases?.product[2] || "";
    }
    return (
      <Stack key={idx} direction="row" justifyContent="space-between">
        <b>{purchases.date[idx]}</b> {purchases.vehicle[idx]}
        <Chip sx={{ width: '100px', mb: '5px' }} color={color} label={value} size="small"/>
      </Stack>
    );
  });
  return items
}

export const sortData = (items) => {
  if (!Array.isArray(items)) return [];
  return [...items].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export const listUsers = (setUsers) => {
    client.models.User.observeQuery().subscribe({
      next: (data) => setUsers(sortData([...data.items])),
    });
}

export const updateUser = async (updatedUser, setUsers) => {
  await client.models.User.update({
    id: updatedUser?.id,
    name: updatedUser?.name,
    email: updatedUser?.email,
    street: updatedUser?.street,
    city: updatedUser?.city,
    state: updatedUser?.state,
    country: updatedUser?.country,
    phone: updatedUser?.phone,
    avatar: updatedUser?.avatar
  });
}

export const deleteUser = async (user, setUsers) => {
  if (!window.confirm(`Delete user ${user.name}?`)) return;
  await client.models.User.delete({ id: user.id });
}

export const setupCenterPosition = (setCenterPosition) => {
  const handleResize = () => {
    setCenterPosition({
      top: window.innerHeight / 2 - 275,
      left: window.innerWidth / 2 - 450,
    });
  }
  handleResize();
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}

export const createUser = async (addNewUser, setUsers) => {
  const name = window.prompt("Enter new user name");
  if (!name) return;
  try {
    const { data } = await addNewUser({
      variables: {
        input: {
          name,
          avatar: Math.floor(Math.random() * 11) + 1,
          // Add other required fields as needed
        },
      },
    });
    if (data?.createUser) {
      setUsers(sortData(prev => [...prev, data.createUser]));
    }
  } catch (err) {
    alert('Failed to add user');
    console.error(err);
  }
}

export const getWebSocketUrl = (graphqlEndpoint) => {
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

export const wsClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_ENDPOINT,
  link: splitLink,
  cache: new InMemoryCache(),
  headers: {
    'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
  }
});