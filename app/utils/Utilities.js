import { generateClient } from "aws-amplify/data";
import { Amplify } from 'aws-amplify';
import { useSubscription } from '@apollo/client';
import outputs from '@/amplify_outputs.json';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { ON_CREATE_USER } from "./Constants";
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  split,
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import * as Constants from '../utils/Constants';

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
        value = Constants.SUBSCRIPTIONS.MONTHLY || "";
        break;
      case 1:
        color = 'secondary';
        value = Constants.SUBSCRIPTIONS.PUNCH || "";
        break;
      case 2:
        color = 'warning';
        value = Constants.SUBSCRIPTIONS.SINGLE|| "";
        break;
      default:
        color = 'default';
        value = Constants.SUBSCRIPTIONS.NONE || "";
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

export const handleInputChanges = (setForm) => (event) => {
  if (!event || !event.target) return;
  const { name, value } = event.target;
  setForm(prev => ({ ...prev, [name]: value }));
};

export const listUsers = (setUsers) => {
    client.models.User.observeQuery().subscribe({
      next: (data) => setUsers(sortData([...data.items])),
    });
}

export const updateUser = async (formValues) => {
  try {
    await client.models.User.update({
      id: formValues.id,
      name: formValues.name,
      email: formValues.email,
      phone: formValues.phone,
      avatar: formValues.avatar ? parseInt(formValues.avatar, 10) : undefined,
      address: {
        street: formValues.street,
        city: formValues.city,
        state: formValues.state,
        country: formValues.country,
      }
    });
  } catch (e) {
    console.error('Failed to update user', e);
  }
}

export const deleteUser = async (user, setUsers) => {
  if (!window.confirm(`Delete user ${user.name}?`)) return;
  await client.models.User.delete({ id: user.id });
}

export const setupCenterPosition = (setCenterPosition, width, height) => {
  const handleResize = () => {
    setCenterPosition({
      top: window.innerHeight / 2 - height,
      left: window.innerWidth / 2 - width
    });
  }
  handleResize();
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}

export const createUser = async (addNewUser, formValues, close) => {
  if (!formValues?.name) {
    alert('Name is required');
    return;
  }
  try {
    await addNewUser({
      variables: {
        input: {
          name: formValues.name,
          avatar: formValues.avatar ? parseInt(formValues.avatar, 10) : Math.floor(Math.random() * 11) + 1,
          email: formValues.email || undefined,
          phone: formValues.phone || undefined,
          address: {
            street: formValues.street || undefined,
            city: formValues.city || undefined,
            state: formValues.state || undefined,
            country: formValues.country || undefined,
          }
        },
      },
    });
    close();
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