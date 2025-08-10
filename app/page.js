"use client"

import React, { useEffect, useState, useCallback } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CustomersTable from './features/CustomersTable';
import { updateUser, deleteUser } from "./utils/Utilities";
import { GetUsers } from "./utils/Utilities";
import { ADD_NEW_USER } from "./utils/Constants";
import { useMutation } from '@apollo/client';

 const App = () => {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const userList = GetUsers();
  const [addNewUser] = useMutation(ADD_NEW_USER);
  /* const { data: test } = SubscribeToUserChange(); */
  const { signOut } = useAuthenticator((context) => [context.user, context.signOut]);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback((event, reason) => {
    if (reason === 'backdropClick' && (!event || event.target == null)) {
      return;
    }
    setOpen(false);
  }, []);

  useEffect(() => {
    if (userList) {
      setUsers(userList.listUsers.items);
    }
  }, [userList]);

  /* useEffect(() => {
    if (test && test.data.createUser) {
      setUsers((prevUsers) => [...prevUsers, test.data.createUser]);
      console.log(test);
    }
  }, [test]); */

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
          <Button
            variant="contained"
            onClick={async () => {
              const name = window.prompt("Enter new user name");
              if (!name) return;
              try {
                const { data } = await addNewUser({
                  variables: {
                    input: {
                      name,
                      avatar: Math.floor(Math.random() * 11) + 1,
                      // Add other required fields as needed
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
            }}
          >
            Add User
          </Button>
        </div>
      </Stack>
      <CustomersTable
        rows={users}
        onUpdate={updateUser}
        onDelete={deleteUser}
        onClose={handleClose}
        open={open}
        setUsers={setUsers}
        setSelectedUser={setSelectedUser}
        selectedUser={selectedUser}
        handleOpen={handleOpen}
      />
    </Stack>
    </main>
  );
}

export default App;
