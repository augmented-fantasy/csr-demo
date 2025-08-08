import React, { useEffect, useState } from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';


const UserPopover = ({ onClose, open, signOut, selectedUser, onUpdate }) => {
  const [centerPosition, setCenterPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    function updateCenter() {
      setCenterPosition({
        top: window.innerHeight / 2 - 200,
        left: window.innerWidth / 2 - 360,
      });
    }
    updateCenter();
    window.addEventListener('resize', updateCenter);
    return () => window.removeEventListener('resize', updateCenter);
  }, []);

  return (
    <Popover
      // sx={{ pointerEvents: 'none' }}
      // disableEnforceFocus={true}
      anchorReference="anchorPosition"
      anchorPosition={centerPosition}
      onClose={onClose}
      open={open}
      slotProps={{ paper: { sx: { width: '720px', height: '420px'} } }}
    >
      <Grid container >
        <Grid
          size={{
            lg: 4,
            md: 6,
            xs: 12,
          }}
          sx={{ m: 4 }}
        >
          <Card>
            <CardContent>
              <Stack 
                spacing={2} 
                sx={{ 
                  alignItems: 'center',
                  m:2
                }}>
                <div>
                  <Avatar src={`/assets/avatar-${selectedUser?.avatar || "8"}.png`} sx={{ height: '80px', width: '80px' }} />
                </div>
                <Stack spacing={1} sx={{ textAlign: 'center' }}>
                  <Typography variant="h5">{selectedUser?.name}</Typography>
                  <Typography color="text.secondary" variant="body2">
                    {selectedUser?.street}
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    {selectedUser?.city} {selectedUser?.country}
                  </Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid
          size={{
            lg: 8,
            md: 6,
            xs: 12,
          }}
        >
          {/* <AccountDetailsForm /> */}
        </Grid>
      </Grid>
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 2, ml: 2, mr: 2 }}>
        <Button variant="outlined" onClick={onClose} sx={{ width: 120 }}>
          Cancel
        </Button>
        <Button variant="contained" onClick={() => onUpdate(selectedUser, setUsers)} sx={{ width: 120 }}>
          Save
        </Button>
      </Stack>
    </Popover>
  );
}

export default UserPopover;
