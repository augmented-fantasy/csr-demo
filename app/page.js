"use client"

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CustomersTable from './customers-table';
import { listUsers, createUser, updateUser, deleteUser } from "./utilities";

 const App = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback((event, reason) => {
    console.log(reason)
    if (reason === 'backdropClick' && (!event || event.target == null)) {
      return;
    }
    setOpen(false);
  }, []);

  const handleToggle = useCallback(() => {
    setOpen((prevState) => !prevState);
  }, []);

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const { signOut } = useAuthenticator((context) => [context.user, context.signOut]);

  useEffect(() => {
    listUsers(setUsers);
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
      <CustomersTable
        rows={users}
        onUpdate={updateUser}
        onDelete={deleteUser}
        onClose={handleClose}
        signOut={signOut}
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
