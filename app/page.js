"use client"

import React, { useEffect, useState, useCallback } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CustomersTable from './features/CustomersTable';
import { updateUser, deleteUser, createUser, listUsers } from "./utils/Utilities";
import { ADD_NEW_USER } from "./utils/Constants";
import { useMutation } from '@apollo/client';
import * as Constants from './utils/Constants';

 const App = () => {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [addNewUser] = useMutation(ADD_NEW_USER);
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
    const unsubscribe = listUsers(setUsers);
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  return (
    <main>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button variant="contained" onClick={signOut}>
            {Constants.BUTTONS.LOGOUT}
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
            onClick={() => createUser(addNewUser, setUsers)}>
            {Constants.BUTTONS.ADD}
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
