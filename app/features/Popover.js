import React, { useEffect, useState } from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { getAvatar, setupCenterPosition, mapSubscriptions, handleInputChanges } from '../utils/Utilities';
import * as Constants from '../utils/Constants';

const UserPopover = ({ onClose, open, selectedUser, updateUser }) => {
  const [centerPosition, setCenterPosition] = useState({ top: 0, left: 0 });
  const [formValues, setFormValues] = useState({
    id: '', 
    name: '', 
    email: '', 
    street: '', 
    city: '', 
    state: '', 
    country: '', 
    phone: '', 
    avatar: ''
  });
  const handleChange = handleInputChanges(setFormValues);

  useEffect(() => {
    setupCenterPosition(setCenterPosition);
  }, []);

  useEffect(() => {
    if (selectedUser) {
      setFormValues({
        id: selectedUser.id || '',
        name: selectedUser.name || '',
        email: selectedUser.email || '',
        street: selectedUser.address?.street || '',
        city: selectedUser.address?.city || '',
        state: selectedUser.address?.state || '',
        country: selectedUser.address?.country || '',
        phone: selectedUser.phone || '',
        avatar: selectedUser.avatar || ''
      });
    }
    console.log(formValues)
  }, [selectedUser, open]);

  return (
    <>
      <Popover
        anchorReference="anchorPosition"
        anchorPosition={centerPosition}
        onClose={onClose}
        open={open}
        slotProps={{ paper: { sx: { width: '975px', height: '550px'} } }}
      >
        <Stack direction="row" spacing={3} sx={{ m: 4 }}>
        
          <Stack sx={{ m: 4, flex: 1}}>
            <Card sx={{ height: '100%', width: '370px' }}>
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
                <Stack direction="column" justifyContent="space-between" sx={{ pt: '20px' }}>
                  <Typography variant="h6">{Constants.UI_TEXT.PURCHASES}</Typography>
                  <Box sx={{ maxHeight: 150, overflowY: 'auto', pr: 1 }}>
                    {mapSubscriptions(selectedUser?.purchases)}
                  </Box>
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
                      <OutlinedInput value={formValues.name} onChange={handleChange} label="Name" name="name" />
                    </FormControl>
                  </Grid>

                  <Grid>
                    <FormControl fullWidth required>
                      <InputLabel>{Constants.UI_TEXT.EMAIL}</InputLabel>
                      <OutlinedInput value={formValues.email} onChange={handleChange} label="Email address" name="email" />
                    </FormControl>
                  </Grid>

                  <Grid>
                    <FormControl fullWidth>
                      <InputLabel>{Constants.UI_TEXT.ADDRESS}</InputLabel>
                      <OutlinedInput value={formValues.street} onChange={handleChange} label="Street Address" name="street" />
                    </FormControl>
                  </Grid>

                  <Grid>
                    <FormControl fullWidth>
                      <InputLabel>{Constants.UI_TEXT.CITY}</InputLabel>
                      <OutlinedInput value={formValues.city} onChange={handleChange} label="City" name="city" />
                    </FormControl>
                  </Grid>

                  <Grid>
                    <FormControl fullWidth>
                      <InputLabel>{Constants.UI_TEXT.STATE}</InputLabel>
                      <OutlinedInput value={formValues.state} onChange={handleChange} label="State" name="state" />
                    </FormControl>
                  </Grid>

                  <Grid>
                    <FormControl fullWidth>
                      <InputLabel>{Constants.UI_TEXT.COUNTRY}</InputLabel>
                      <OutlinedInput value={formValues.country} onChange={handleChange} label="Country" name="country" />
                    </FormControl>
                  </Grid>

                  <Grid>
                    <FormControl fullWidth>
                      <InputLabel>{Constants.UI_TEXT.PHONE}</InputLabel>
                      <OutlinedInput value={formValues.phone} onChange={handleChange} label="Phone number" name="phone" type="tel" />
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
          <Button variant="contained" onClick={() => { updateUser(formValues); onClose(); }} sx={{ width: 120 }}>
            {Constants.BUTTONS.SAVE}
          </Button>
        </Stack>
      </Popover>
    </>
  );
}

export default UserPopover;
