import { generateClient } from "aws-amplify/data";
import { Amplify } from 'aws-amplify';
import { useQuery, useSubscription } from '@apollo/client';
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

// Remove createUser hook usage from here. Use ADD_NEW_USER with useMutation in your component.

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

export const createUser = async (setUsers) => {
  const name = window.prompt("Enter new user name");
  if (!name) return;
  try {
    const { data } = await addNewUser({
      variables: {
        input: {
          name,
          avatar: Math.floor(Math.random() * 11) + 1,
          // TODO add other required fields as needed
        },
      },
    });
    if (data?.createUser) {
      setUsers((prev) => [...prev, data.createUser]);
    }
  } catch (err) {
    alert('Failed to add user');
    console.error(err);
  }
}