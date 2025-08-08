"use client"

import React, { useEffect, useState } from 'react';
import { Amplify } from 'aws-amplify';
import outputs from '@/amplify_outputs.json';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { generateClient } from "aws-amplify/data";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CustomersTable } from './customers-table'

Amplify.configure(outputs);
const client = generateClient()

export default function App() {
  const [users, setUsers] = useState([]);
  const { signOut } = useAuthenticator((context) => [context.user, context.signOut]);

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

  return (
    <main>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button variant="contained" onClick={signOut}>
            Logout
        </Button>
      </div>
      <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Customers</Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          </Stack>
        </Stack>
        <div>
          <Button variant="contained" onClick={createUser}>
            Add User
        </Button>
        </div>
      </Stack>
      <CustomersTable rows={users}/>
    </Stack>
    </main>
  );
}
