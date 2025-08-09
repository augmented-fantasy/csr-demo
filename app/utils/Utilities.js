import { generateClient } from "aws-amplify/data";
import { Amplify } from 'aws-amplify';
import outputs from '@/amplify_outputs.json';
import { subscriptionTypes } from "./Constants";
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

Amplify.configure(outputs);
const client = generateClient()

const onPurchaseClick = (subscriptions) => {
  alert("You clicked on: " + subscriptions);
}

export const getAvatar = () => {
  return (Math.floor(Math.random() * 11) + 1).toString();
}

export const mapSubscriptions = (purchases) => {
  let color = 'primary';
  const items = purchases?.vehicle?.map((purchase, idx) => (
    <Stack key={idx} direction="row" justifyContent="space-between">
      <b>{purchases.date[0]}</b> {purchases.vehicle[0]}
      <Chip sx={{ width: '100px', mb: '5px' }} color={color} label={purchases.product[0]} size="small"/>
    </Stack>
  ))
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