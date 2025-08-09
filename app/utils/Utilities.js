import { generateClient } from "aws-amplify/data";
import { Amplify } from 'aws-amplify';
import outputs from '@/amplify_outputs.json';
import { subscriptionTypes } from "./Constants";
import Chip from '@mui/material/Chip';

Amplify.configure(outputs);
const client = generateClient()

export const getAvatar = () => {
  return (Math.floor(Math.random() * 11) + 1).toString();
}

export const mapSubscriptions = (membership) => {
  let subscription = null;
  let color = 'default';
  switch (membership) {
    case 'MONTHLY':
      subscription = subscriptionTypes['MONTHLY'];
      color = 'primary';
      break;
    case 'PUNCH':
      subscription = subscriptionTypes['PUNCH'];
      color = 'secondary';
      break;
    case 'NONE':
      subscription = subscriptionTypes['NONE'];
      break;
    default:
      return null;
  }
  return (
    <Chip sx={{ width: '135px'}} color={color} label={subscription} size="small" />
  )
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
  function handleResize() {
    setCenterPosition({
      top: window.innerHeight / 2 - 275,
      left: window.innerWidth / 2 - 450,
    });
  }
  handleResize();
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}