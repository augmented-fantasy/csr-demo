import { generateClient } from "aws-amplify/data";
import { Amplify } from 'aws-amplify';
import outputs from '@/amplify_outputs.json';
import { subscriptionTypes } from "./constants";

Amplify.configure(outputs);
const client = generateClient()

export const mapSubscriptions = (membership) => {
  let subscription = null;
  switch (membership) {
    case 'MONTHLY':
      subscription = subscriptionTypes['MONTHLY'];
      break;
    case 'PUNCH':
      subscription = subscriptionTypes['PUNCH'];
      break;
    case 'NONE':
      subscription = subscriptionTypes['NONE'];
      break;
    default:
      return null;
  }
  return subscription;
}

export const listUsers = (setUsers) => {
    client.models.User.observeQuery().subscribe({
      next: (data) => setUsers([...data.items]),
    });
  }

  export const createUser = () => {
    client.models.User.create({
      name: window.prompt("Enter new user name"),
    });
  }

  export const updateUser = async (user, setUsers) => {
    const newName = window.prompt("Enter new name for user", user.name);
    if (!newName) return;
    await client.models.User.update({
      id: user.id,
      name: newName,
    });
    listUsers(setUsers);
  }

  export const deleteUser = async (user, setUsers) => {
    if (!window.confirm(`Delete user ${user.name}?`)) return;
    await client.models.User.delete({ id: user.id });
    listUsers(setUsers);
  }