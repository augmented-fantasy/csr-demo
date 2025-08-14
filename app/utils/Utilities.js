import { generateClient } from "aws-amplify/data";
import { Amplify } from 'aws-amplify';
import outputs from '@/amplify_outputs.json';
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
    case Constants.SUBSCRIPTIONS.LIFETIME:
      color = 'primary';
        break;
    case Constants.SUBSCRIPTIONS.ANNUAL:
      color = 'success';
        break;
    case Constants.SUBSCRIPTIONS.MONTHLY:
      color = 'info';
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
      email: formValues.email || undefined,
      phone: formValues.phone || undefined,
      avatar: formValues.avatar ? parseInt(formValues.avatar, 10) : undefined,
      loyalty: formValues.loyalty || undefined,
      vehicles: formValues.vehicles || [],
      address: {
        street: formValues.street || undefined,
        city: formValues.city || undefined,
        state: formValues.state || undefined,
        country: formValues.country || undefined,
      }
    });
    fetchUsers(refetch, setUsers);
  } catch (e) {
    console.error('Failed to update user', e);
  }
}

export const deleteUser = async (user, setUsers, refetch) => {
  if (!window.confirm(`Are you sure you want to delete user ${user.name}?`)) return;
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
  console.log(formValues);
  if (formValues.name == '' || formValues.name == undefined) {
    alert('Name is required.');
    return;
  }
  if (formValues.email == '' || formValues.email == undefined) {
    alert('Email is required.');
    return;
  }
  try {
    await addNewUser({
      variables: {
        input: {
          name: formValues.name,
          avatar: formValues.avatar ? parseInt(formValues.avatar, 10) : Math.floor(Math.random() * 11) + 1,
          email: formValues.email,
          phone: formValues.phone,
          address: {
            street: formValues.street,
            city: formValues.city,
            state: formValues.state,
            country: formValues.country,
          },
          loyalty: formValues.loyalty || 0,
          vehicles: formValues.vehicles || []
        },
      },
    });
    fetchUsers(refetch, setUsers);
    close();
  } catch (err) {
    alert('Please enter a valid email format');
    console.error(err);
  }
}

export const deleteSub = async (id) => {
  await client.models.Subscriptions.delete({ id: id });
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

export const createSubscription = (values) => {
  client.models.Subscriptions.create({
    userId: values.userId,
    product: values.product,
    price: values.price,
    vehicle: values.vehicle,
    date: values.date
  });
}

export const deleteSubscription = async (values) => {
  client.models.Subscriptions.delete({
    userId: values.userId,
    product: values.product,
    price: values.price,
    vehicle: values.vehicle,
    date: values.date
  });
}

export const modifySubscription = async (values) => {
  console.log('Modifying subscription:', values);
  client.models.Subscriptions.update({
    id: values.id,
    userId: values.userId,
    product: values.product,
    price: values.price,
    vehicle: values.vehicle,
    date: values.date
  });
}