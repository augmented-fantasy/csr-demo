import React from 'react';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import * as Constants from '../utils/Constants';
import { getAvatar, mapSubscriptions } from '../utils/Utilities';
import Chip from '@mui/material/Chip';

const UserInfo = ({ selectedUser, formValues, handleChange, openPurchases }) => {

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

              <Stack onClick={() => openPurchases(true)} direction="row" justifyContent="space-between" sx={{ pt: '20px' }}>
                <Typography variant="h6">{Constants.UI_TEXT.PURCHASES}</Typography>
                <Typography variant="h6" color={'error'}>{Constants.UI_TEXT.CLICK_TO_VIEW_EDIT}</Typography>
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
    </>
  );
};

export default UserInfo;
