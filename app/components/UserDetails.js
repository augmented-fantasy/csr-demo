import React, { useEffect, useState } from 'react';
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { setupCenterPosition, handleInputChanges } from '../utils/Utilities';
import * as Constants from '../utils/Constants';
import UserInfo from './UserInfo';
import PurchasesInfo from './PurchasesInfo';
import Subscriptions from './Subscriptions';

const UserDetails = ({ 
  onClose, 
  open, 
  selectedUser, 
  updateUser, 
  refetch, 
  setUsers,
  openPurchases,
  setOpenPurchases,
  openSubscriptions,
  setOpenSubscriptions
}) => {
  const [width, height] = [485, 250];
  
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
  }, [width, height]);

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
        {(!openPurchases && !openSubscriptions) && (
          <>
            <UserInfo 
              selectedUser={selectedUser} 
              formValues={formValues} 
              handleChange={handleChange} 
              updateUser={updateUser} 
              openPurchases={setOpenPurchases}
              openSubscriptions={setOpenSubscriptions}
            />

            <Stack direction="row" justifyContent="space-between" sx={{ ml: 4, mr: 4 }}>
              <Button variant="outlined" onClick={onClose} sx={{ width: 120 }}>
                {Constants.BUTTONS.CLOSE}
              </Button>
              <Button variant="contained" onClick={() => { updateUser(formValues, refetch, setUsers); onClose(); }} sx={{ width: 120 }}>
                {Constants.BUTTONS.SAVE}
              </Button>
            </Stack>
          </>
        )}
        {openPurchases && (
          <PurchasesInfo 
            selectedUser={selectedUser}
            onClose={() => setOpenPurchases(false)}
          />
        )}
        {openSubscriptions && (
          <Subscriptions
            selectedUser={selectedUser}
            onClose={() => setOpenSubscriptions(false)}
          />
        )}
      </Popover>
    </>
  );
}

export default UserDetails;
