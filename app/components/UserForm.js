"use client";
import React, { useEffect, useState } from 'react';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { setupCenterPosition, handleInputChanges } from '../utils/Utilities';
import * as Constants from '../utils/Constants';
import { createUser } from "../utils/Utilities";
import { ADD_NEW_USER } from "../utils/Constants";
import { useMutation } from '@apollo/client';

const UserDetails = ({ onClose, open }) => {
  const [width, height] = [300, 250];
  const [addNewUser] = useMutation(ADD_NEW_USER);
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
    setupCenterPosition(setCenterPosition, width, height);
  }, []);

  // Reset form when modal opens
  useEffect(() => {
    if (open) {
      setFormValues({ id: '', name: '', email: '', street: '', city: '', state: '', country: '', phone: '', avatar: '' });
    }
  }, [open]);

  return (
    <>
      <Popover
        anchorReference="anchorPosition"
        anchorPosition={centerPosition}
        onClose={onClose}
        open={open}
        slotProps={{ paper: { sx: { width: '600px', height: '550px'} } }}
      >
        <Stack direction="row" spacing={2} sx={{ m: 4 }}>
          <Stack sx={{ flex: 2 }}>
            <Card>
              <CardHeader title={Constants.UI_TEXT.ADD_NEW_USER} />
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
          <Button variant="contained" onClick={async () => { await createUser(addNewUser, formValues, onClose); }} sx={{ width: 120 }}>
            {Constants.BUTTONS.SAVE}
          </Button>
        </Stack>
      </Popover>
    </>
  );
}

export default UserDetails;
