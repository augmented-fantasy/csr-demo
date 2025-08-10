"use client"

import React, { useEffect, useState, useCallback } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CustomersTable from './features/CustomersTable';
import { updateUser, deleteUser, listUsers } from "./utils/Utilities";
import * as Constants from './utils/Constants';
import UserDetails from './features/UserDetails';

 const App = () => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const { signOut } = useAuthenticator((context) => [context.user, context.signOut]);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleOpenEdit = useCallback(() => {
    setOpenEdit(true);
  }, []);


  const handleClose = useCallback((event, reason) => {
    if (reason === 'backdropClick' && (!event || event.target == null)) {
      return;
    }
    setOpen(false);
  }, []);

  const handleCloseEdit = useCallback((event, reason) => {
    /* if (reason === 'backdropClick' && (!event || event.target == null)) {
      return;
    } */
    setOpenEdit(false);
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
          <Typography variant="h4">{Constants.UI_TEXT.CUSTOMERS}</Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          </Stack>
        </Stack>
        <div>
          <Button
            variant="contained"
            onClick={handleOpenEdit}>
            {Constants.BUTTONS.ADD}
          </Button>
        </div>
      </Stack>
      <CustomersTable
        rows={users}
        updateUser={updateUser}
        onDelete={deleteUser}
        onClose={handleClose}
        open={open}
        setUsers={setUsers}
        setSelectedUser={setSelectedUser}
        selectedUser={selectedUser}
        handleOpen={handleOpen}
      />
    </Stack>
    <UserDetails 
      onClose={handleCloseEdit} 
      open={openEdit} 
      signOut={signOut}
    />
    </main>
  );
}

export default App;
