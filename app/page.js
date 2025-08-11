"use client"

import { useEffect, useState } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CustomersTable from './components/CustomerList';
import { updateUser, deleteUser, listUsers } from "./utils/Utilities";
import * as Constants from './utils/Constants';
import UserDetails from './components/UserForm';
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import { useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';

 const App = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const { signOut } = useAuthenticator((context) => [context.user, context.signOut]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  useEffect(() => {
    const unsubscribe = listUsers(setUsers);
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  return (
    <Box sx={{ display: 'flex', width: '100vw', maxWidth: '100%' }}>
      <MuiAppBar
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          backgroundColor: '#000'
        }}
      >
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ textAlign: 'center', width: '100%' }}>
            {Constants.UI_TEXT.SITE_TITLE}
          </Typography>
        </Toolbar>
      </MuiAppBar>
      <MuiDrawer
        variant="permanent"
        sx={{
          '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: 250,
            backgroundColor: theme.palette.primary.main
          },
        }}>
      </MuiDrawer>
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          width: '100%',
          pl: `20px`,
          pt: `${theme.spacing(8)}`,
          boxSizing: 'border-box'
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}
        >
          <Stack spacing={4} alignItems="stretch" sx={{ pt: '20px', width: '100%', maxWidth: 1200 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h4">{Constants.UI_TEXT.CUSTOMERS}</Typography>
              <Stack direction="row" spacing={2}>
                <Button variant="contained" onClick={handleOpenEdit}>{Constants.BUTTONS.ADD}</Button>
                <Button variant="outlined" onClick={signOut}>{Constants.BUTTONS.LOGOUT}</Button>
              </Stack>
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
        </Box>
      </Box>
      <UserDetails onClose={handleCloseEdit} open={openEdit} signOut={signOut} />
    </Box>
  );
}

export default App;
