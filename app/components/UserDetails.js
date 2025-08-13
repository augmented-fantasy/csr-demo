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
  setOpenSubscriptions,
  setSelectedUser
}) => {
  const [width, height] = [485, 350];
  
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
    avatar: '',
    vehicles: []
  });

  const [localRows, setLocalRows] = useState([]);
  const [subscriptionValues, setSubscriptionValues] = useState({
      userId: selectedUser?.id || '',
      product: selectedUser?.product || "LIFETIME",
      price: 9.99, // TODO set prices per product
      vehicle: selectedUser?.vehicles?.[0] || "ANY",
      date: new Date().toISOString().split('T')[0]
  });

  const handleChange = handleInputChanges(setFormValues);

  const [vehicleInput, setVehicleInput] = useState('');

  useEffect(() => {
    setupCenterPosition(setCenterPosition, width, height);
  }, [width, height]);

  useEffect(() => {
    if (selectedUser) {
      setFormValues({
        id: selectedUser.id || '',
        name: selectedUser.name || '',
        email: selectedUser.email || undefined,
        street: selectedUser.address?.street || '',
        city: selectedUser.address?.city || '',
        state: selectedUser.address?.state || '',
        country: selectedUser.address?.country || '',
        phone: selectedUser.phone || undefined,
        avatar: selectedUser.avatar || undefined,
        loyalty: selectedUser.loyalty || undefined,
        vehicles: selectedUser.vehicles || []
      });
    }
  }, [selectedUser, open]);

  useEffect(() => {
    setLocalRows(selectedUser?.subscriptions?.items?.map((subscriptions, idx) => ({
        id: idx,
        subId: subscriptions.id,
        userId: subscriptions.userId,
        date: subscriptions.date,
        product: subscriptions.product,
        vehicle: subscriptions.vehicle,
        price: subscriptions.price,
        })));
  }, [selectedUser?.subscriptions?.items]);

  return (
    <>
      <Popover
        anchorReference="anchorPosition"
        anchorPosition={centerPosition}
        onClose={onClose}
        open={open}
        slotProps={{ paper: { sx: { width: '975px', height: '720px'} } }}
      >
        {(!openPurchases && !openSubscriptions) && (
          <>
            <UserInfo 
              selectedUser={selectedUser} 
              formValues={formValues} 
              handleChange={handleChange} 
              openPurchases={setOpenPurchases}
              openSubscriptions={setOpenSubscriptions}
              vehicleInput={vehicleInput} 
              setVehicleInput={setVehicleInput}
              setFormValues={setFormValues}
              setUsers={setUsers}
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
            setUsers={setUsers}
            refetch={refetch}
            setSelectedUser={setSelectedUser}
            localRows={localRows}
            setLocalRows={setLocalRows}
            subscriptionValues={subscriptionValues}
            setSubscriptionValues={setSubscriptionValues}
          />
        )}
      </Popover>
    </>
  );
}

export default UserDetails;
