"use client"

import { useEffect, useState } from "react";
import { Amplify } from 'aws-amplify';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { generateClient } from "aws-amplify/data"; // Data client for CRUDL requests
import outputs from '@/amplify_outputs.json';
import "@aws-amplify/ui-react/styles.css";

Amplify.configure(outputs);
const client = generateClient()

export default function App() {
  const [users, setUsers] = useState([]);

  const listUsers = () => {
    client.models.User.observeQuery().subscribe({
      next: (data) => setUsers([...data.items]),
    });
  }

  const createUser = () => {
    client.models.User.create({
      name: window.prompt("Enter new user name"),
    });
  }

  useEffect(() => {
    listUsers();
  }, []);

  const { user, signOut } = useAuthenticator((context) => [context.user, context.signOut]);
  return (
    <main>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={createUser}>Add User</button>
        <button onClick={signOut}>Logout</button>
      </div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name} {user.email}</li>
        ))}
      </ul>
    </main>
  );
}
