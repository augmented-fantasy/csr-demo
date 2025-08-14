"use client";
import React, { useEffect, useState } from 'react';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { setupCenterPosition, handleInputChanges } from '../utils/Utilities';
import * as Constants from '../utils/Constants';
import { createUser } from "../utils/Utilities";
import { useMutation } from '@apollo/client';
import UserFormInputs from './UserFormInputs';

const UserForm = ({ onClose, open, refetch, setUsers }) => {
  const [width, height] = [300, 350];
  const [addNewUser] = useMutation(Constants.ADD_NEW_USER);
  const [centerPosition, setCenterPosition] = useState({ top: 0, left: 0 });
  const [formValues, setFormValues] = useState({
    id: '', 
    name: '', 
    email: undefined,
    street: '', 
    city: '', 
    state: '', 
    country: '', 
    phone: undefined, 
    avatar: '',
    loyalty: undefined,
    vehicles: []
  });
  const handleChange = handleInputChanges(setFormValues);
  const [vehicleInput, setVehicleInput] = useState('');

  useEffect(() => {
    setupCenterPosition(setCenterPosition, width, height);
  }, [width, height]);

  useEffect(() => {
    if (open) {
      setFormValues({ 
        id: '', 
        name: '', 
        email: undefined, 
        street: '', 
        city: '', 
        state: '', 
        country: '', 
        phone: undefined, 
        avatar: '',
        loyalty: undefined, 
        vehicles: []
      });
    }
  }, [open]);

  return (
    <Popover
      anchorReference="anchorPosition"
      anchorPosition={centerPosition}
      onClose={onClose}
      open={open}
      slotProps={{ paper: { sx: { width: '600px', height: '715px'} } }}
    >
      <Stack direction="row" spacing={2} sx={{ m: 4 }}>
        <Stack sx={{ flex: 2 }}>
          <Card>
            <CardHeader title={Constants.UI_TEXT.ADD_NEW_USER} />
            <Divider />
            <CardContent>
              <UserFormInputs formValues={formValues} handleChange={handleChange} setFormValues={setFormValues} vehicleInput={vehicleInput} setVehicleInput={setVehicleInput} />
            </CardContent>
          </Card>
        </Stack>
      </Stack>
      
      <Stack direction="row" justifyContent="space-between" sx={{ m: 4 }}>
        <Button variant="outlined" onClick={onClose} sx={{ width: 120 }}>
          {Constants.BUTTONS.CLOSE}
        </Button>
        <Button 
          variant="contained" 
          onClick={async () => { await createUser(addNewUser, formValues, onClose, refetch, setUsers); }} 
          sx={{ width: 120 }}>
          {Constants.BUTTONS.SAVE}
        </Button>
      </Stack>
      
    </Popover>
  );
}

export default UserForm;
