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
import { getAvatar, setupCenterPosition, mapSubscriptions } from '../utils/Utilities';
import * as Constants from '../utils/Constants';

const UserPopover = ({ onClose, open, selectedUser, onUpdate }) => {
  const [centerPosition, setCenterPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    setupCenterPosition(setCenterPosition);
  }, []);

  return (
    <>
      <Popover
        anchorReference="anchorPosition"
        anchorPosition={centerPosition}
        onClose={onClose}
        open={open}
        slotProps={{ paper: { sx: { width: '900px', height: '550px'} } }}
      >
        <Stack direction="row" spacing={3} sx={{ m: 4 }}>
        
          <Stack sx={{ m: 4, flex: 1}}>
            <Card sx={{ height: '100%', width: '310px' }}>
              <CardContent>
                <Stack 
                  spacing={2} 
                  sx={{ 
                    alignItems: 'center'
                  }}>
                  <div>
                    <Avatar src={`/assets/avatar-${selectedUser?.avatar || getAvatar()}.png`} sx={{ height: '80px', width: '80px' }} />
                  </div>
                  <Stack spacing={1} sx={{ textAlign: 'center' }}>
                    <Typography variant="h5">{selectedUser?.name}</Typography>
                    <Typography color="text.secondary" variant="body2">
                      {selectedUser?.address?.street}
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
                      {selectedUser?.address?.city} {selectedUser?.address?.state} {selectedUser?.address?.country}
                    </Typography>
                  </Stack>
                </Stack>
                <Stack direction="column" justifyContent="space-between" sx={{ pt: '30px' }}>
                  <Typography sx={{ pb: '10px' }}variant="h6">{Constants.UI_TEXT.PURCHASES}</Typography>
                  {mapSubscriptions(selectedUser?.purchases)}
                </Stack>
              </CardContent>
            </Card>
          </Stack>

          <Stack sx={{ flex: 2 }}>
            <Card>
              <CardHeader subheader="This information can be edited." title="Customer Profile" />
              <Divider />
              <CardContent>
                <Grid container spacing={3}>
                  
                  <Grid>
                    <FormControl fullWidth required>
                      <InputLabel>{Constants.UI_TEXT.NAME}</InputLabel>
                      <OutlinedInput defaultValue={selectedUser?.name} label="Name" name="name" />
                    </FormControl>
                  </Grid>

                  <Grid>
                    <FormControl fullWidth required>
                      <InputLabel>{Constants.UI_TEXT.EMAIL}</InputLabel>
                      <OutlinedInput defaultValue={selectedUser?.email} label="Email address" name="email" />
                    </FormControl>
                  </Grid>

                  <Grid>
                    <FormControl fullWidth>
                      <InputLabel>{Constants.UI_TEXT.ADDRESS}</InputLabel>
                      <OutlinedInput defaultValue={selectedUser?.address?.street} label="Street Address" name="street" />
                    </FormControl>
                  </Grid>

                  <Grid>
                    <FormControl fullWidth>
                      <InputLabel>{Constants.UI_TEXT.CITY}</InputLabel>
                      <OutlinedInput defaultValue={selectedUser?.address?.city} label="City" name="city" />
                    </FormControl>
                  </Grid>

                  <Grid>
                    <FormControl fullWidth>
                      <InputLabel>{Constants.UI_TEXT.STATE}</InputLabel>
                      <OutlinedInput defaultValue={selectedUser?.address?.state} label="State" name="state" />
                    </FormControl>
                  </Grid>

                  <Grid>
                    <FormControl fullWidth>
                      <InputLabel>{Constants.UI_TEXT.COUNTRY}</InputLabel>
                      <OutlinedInput defaultValue={selectedUser?.address?.country} label="Country" name="country" />
                    </FormControl>
                  </Grid>

                  <Grid>
                    <FormControl fullWidth>
                      <InputLabel>{Constants.UI_TEXT.PHONE}</InputLabel>
                      <OutlinedInput defaultValue={selectedUser?.phone} label="Phone number" name="phone" type="tel" />
                    </FormControl>
                  </Grid>

                </Grid>
              </CardContent>
            </Card>
          </Stack>
        </Stack>
        
        <Stack direction="row" justifyContent="space-between" sx={{ m: 2 }}>
          <Button variant="outlined" onClick={onClose} sx={{ width: 120 }}>
            {Constants.BUTTONS.CANCEL}
          </Button>
          <Button variant="contained" onClick={() => onUpdate(selectedUser, setUsers)} sx={{ width: 120 }}>
            {Constants.BUTTONS.SAVE}
          </Button>
        </Stack>
      </Popover>
    </>
  );
}

export default UserPopover;
