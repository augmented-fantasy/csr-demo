import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


const UserPopover = ({ onClose, open, signOut, selectedUser, onUpdate }) => {
  const [centerPosition, setCenterPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    function updateCenter() {
      setCenterPosition({
        top: window.innerHeight / 2 - 200,
        left: window.innerWidth / 2 - 270,
      });
    }
    updateCenter();
    window.addEventListener('resize', updateCenter);
    return () => window.removeEventListener('resize', updateCenter);
  }, []);

  return (
    <Popover
      anchorReference="anchorPosition"
      anchorPosition={centerPosition}
      onClose={onClose}
      open={open}
      slotProps={{ paper: { sx: { width: '540px' } } }}
    >
      <Box sx={{ p: '16px 20px ' }}>
        <Typography variant="subtitle1">Name</Typography>
        <Typography color="text.secondary" variant="body2">
          {selectedUser?.name}
        </Typography>
      </Box>
      <Divider />
      <MenuList disablePadding sx={{ p: '8px', '& .MuiMenuItem-root': { borderRadius: 1 } }}>
        <MenuItem>
          <ListItemIcon>
            {/* <GearSixIcon fontSize="var(--icon-fontSize-md)" /> */}
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            {/* <UserIcon fontSize="var(--icon-fontSize-md)" /> */}
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={signOut}>
          <ListItemIcon>
            {/* <SignOutIcon fontSize="var(--icon-fontSize-md)" /> */}
          </ListItemIcon>
          Sign out
        </MenuItem>
      </MenuList>
      <Button variant="contained" onClick={() => onUpdate(selectedUser, setUsers)}>
        SAVE
      </Button>
    </Popover>
  );
}

export default UserPopover;
