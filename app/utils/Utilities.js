import { generateClient } from "aws-amplify/data";
import { Amplify } from 'aws-amplify';
import { useQuery, useSubscription, gql } from '@apollo/client';
import outputs from '@/amplify_outputs.json';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { GET_USERS, ON_CREATE_USER } from "./Constants";

Amplify.configure(outputs);
const client = generateClient()

export const GetUsers = () => {
  const { data } = useQuery(GET_USERS);
  return (data);
}

export const SubscribeToUserChange = () => {
  return useSubscription(ON_CREATE_USER);
}

const onPurchaseClick = (subscriptions) => {
  alert("You clicked on: " + subscriptions);
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

export const listUsers = (setUsers) => {
    client.models.User.observeQuery().subscribe({
      next: (data) => setUsers([...data.items]),
    });
}

export const createUser = () => {
  client.models.User.create({
    name: window.prompt("Enter new user name"),
    avatar: getAvatar()
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
  listUsers(setUsers);
}

export const deleteUser = async (user, setUsers) => {
  if (!window.confirm(`Delete user ${user.name}?`)) return;
  await client.models.User.delete({ id: user.id });
  listUsers(setUsers);
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

export const ADD_NEW_USER = gql`
  mutation AddNewUser($input: CreateUserInput!) {
    createUser(input: $input) {
      address {
        city
        country
        state
        street
      }
      avatar
      email
      id
      name
      phone
      purchases {
        date
        product
        subscription
        vehicle
      }
    }
  }
`;