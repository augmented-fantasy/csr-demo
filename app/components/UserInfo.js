import React from 'react';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import * as Constants from '../utils/Constants';
import { getAvatar, mapSubscriptions } from '../utils/Utilities';
import Chip from '@mui/material/Chip';
import UserFormInputs from './UserFormInputs';
import Button from '@mui/material/Button';

const UserInfo = ({ selectedUser, formValues, handleChange, openPurchases, openSubscriptions }) => {

  return (
    <>
      <Stack direction="row" spacing={3} sx={{ m: 4 }}>
        <Stack sx={{ m: 4, flex: 1}}>
          <Card sx={{ height: '100%', width: '370px' }}>
            <CardContent>
              <Stack spacing={2} sx={{ alignItems: 'center' }}>
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

              {selectedUser?.purchases?.items.length != 0 &&
              <>
                <Stack direction="row" justifyContent="space-between" sx={{ pt: '20px', cursor: 'pointer' }}>
                  <Button onClick={() => openSubscriptions(true)}size="small" color={'error'} variant="outlined">{Constants.BUTTONS.SUBSCRIPTIONS}</Button>
                  <Button onClick={() => openPurchases(true)}size="small" color={'error'} variant="outlined">{Constants.BUTTONS.PURCHASE_HISTORY}</Button>
                </Stack>
                <Stack direction="column" justifyContent="space-between" sx={{ pt: '20px' }}>
                  <Box sx={{ maxHeight: 130, overflowY: 'auto', pr: 1 }}>
                    {selectedUser.purchases.items.map((purchase, idx) => (
                      <Stack key={idx} direction="row" justifyContent="space-between">
                        <b>{purchase.date}</b> {purchase.vehicle}
                        <Chip sx={{ width: '100px', mb: '5px' }} color={mapSubscriptions(purchase.product)} label={purchase.product} size="small"/>
                      </Stack>
                    ))}
                  </Box>
                </Stack>
              </>
              }
            </CardContent>
          </Card>
        </Stack>
        <Stack sx={{ flex: 2 }}>
          <Card>
            <CardHeader subheader={Constants.UI_TEXT.FORM_HEADER} title={Constants.UI_TEXT.CUSTOMER_PROFILE} />
            <Divider />
            <CardContent>
              <UserFormInputs formValues={formValues} handleChange={handleChange} />
            </CardContent>
          </Card>
        </Stack>
      </Stack>
    </>
  );
};

export default UserInfo;
