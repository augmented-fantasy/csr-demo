import React, { useEffect, useState } from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';

const UserPopover = ({ onClose, open, signOut, selectedUser, onUpdate }) => {
  const [centerPosition, setCenterPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    function updateCenter() {
      setCenterPosition({
        top: window.innerHeight / 2 - 200,
        left: window.innerWidth / 2 - 450,
      });
    }
    updateCenter();
    window.addEventListener('resize', updateCenter);
    return () => window.removeEventListener('resize', updateCenter);
  }, []);

  return (
    <>
      <Popover
        // sx={{ pointerEvents: 'none' }}
        // disableEnforceFocus={true}
        anchorReference="anchorPosition"
        anchorPosition={centerPosition}
        onClose={onClose}
        open={open}
        slotProps={{ paper: { sx: { width: '900px', height: '465px'} } }}
      >
        <Stack direction="row" spacing={3} sx={{ m: 4 }}>
          <Stack sx={{ m: 4, flex: 1 }}>
            <Card>
              <CardContent>
                <Stack 
                  spacing={2} 
                  sx={{ 
                    alignItems: 'center'
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
          </Stack>
          <Stack sx={{ flex: 2 }}>
            <Card>
              <CardHeader subheader="The information can be edited" title="Profile" />
              <Divider />
              <CardContent>
                <Grid container spacing={3}>
                  
                  <Grid>
                    <FormControl fullWidth required>
                      <InputLabel>Name</InputLabel>
                      <OutlinedInput defaultValue={selectedUser?.name} label="Name" name="name" />
                    </FormControl>
                  </Grid>

                  <Grid>
                    <FormControl fullWidth required>
                      <InputLabel>Email address</InputLabel>
                      <OutlinedInput defaultValue={selectedUser?.email} label="Email address" name="email" />
                    </FormControl>
                  </Grid>

                  <Grid>
                    <FormControl fullWidth>
                      <InputLabel>Street Address</InputLabel>
                      <OutlinedInput defaultValue={selectedUser?.street} label="Street Address" name="street" />
                    </FormControl>
                  </Grid>

                  <Grid>
                    <FormControl fullWidth>
                      <InputLabel>State</InputLabel>
                      <OutlinedInput defaultValue={selectedUser?.state} label="State" name="state" />
                    </FormControl>
                  </Grid>

                  <Grid>
                    <FormControl fullWidth>
                      <InputLabel>Country</InputLabel>
                      <OutlinedInput defaultValue={selectedUser?.country} label="Country" name="country" />
                    </FormControl>
                  </Grid>

                  <Grid>
                    <FormControl fullWidth>
                      <InputLabel>Phone number</InputLabel>
                      <OutlinedInput defaultValue={selectedUser?.phone} label="Phone number" name="phone" type="tel" />
                    </FormControl>
                  </Grid>

                  {/* <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <FormControl fullWidth>
                      <InputLabel>State</InputLabel>
                      <Select defaultValue={selectedUser?.state} label="State" name="state" variant="outlined">
                        {states.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid> */}

                </Grid>
              </CardContent>
            </Card>
          </Stack>
        </Stack>
        <Stack direction="row" justifyContent="space-between" sx={{ m: 2 }}>
          <Button variant="outlined" onClick={onClose} sx={{ width: 120 }}>
            Cancel
          </Button>
          <Button variant="contained" onClick={() => onUpdate(selectedUser, setUsers)} sx={{ width: 120 }}>
            Save
          </Button>
        </Stack>
      </Popover>
    </>
  );
}

export default UserPopover;
