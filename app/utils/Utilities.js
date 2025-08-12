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

export const getAvatar = () => {
  return (Math.floor(Math.random() * 11) + 1).toString();
}

export const mapSubscriptions = (purchase) => {
  let color = 'primary';
  switch (purchase) {
    case Constants.SUBSCRIPTIONS.MONTHLY:
      color = 'primary';
        break;
    case Constants.SUBSCRIPTIONS.PUNCH:
      color = 'secondary';
      break;
    case Constants.SUBSCRIPTIONS.SINGLE:
      color = 'warning';
      break;
      default:
        color = 'default';
    }
    return color;
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

export const updateUser = async (formValues, refetch, setUsers) => {
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
    fetchUsers(refetch, setUsers);
  } catch (e) {
    console.error('Failed to update user', e);
  }
}

export const deleteUser = async (user, setUsers, refetch) => {
  if (!window.confirm(`Delete user ${user.name}?`)) return;
  await client.models.User.delete({ id: user.id });
  fetchUsers(refetch, setUsers);
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

export const createUser = async (addNewUser, formValues, close, refetch, setUsers) => {
  if (!formValues?.name || 
    !formValues?.email || 
    !formValues?.phone || 
    !formValues?.street || 
    !formValues?.city || 
    !formValues?.state || 
    !formValues?.country
  ) {
    alert('All fields are required.');
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
    fetchUsers(refetch, setUsers);
    close();
  } catch (err) {
    alert('Failed to add user');
    console.error(err);
  }
}

export const fetchUsers = async (refetch, setUsers) => {
  try {
    const { data } = await refetch();
    const sorted = sortData(data.listUsers.items);
    setUsers(sorted);
  } catch (error) {
    console.error('Failed to fetch users:', error);
  }
};

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