import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import * as Constants from '../utils/Constants';
import { DataGrid } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import { deleteSub } from '../utils/Utilities';
import { createSubscription, modifySubscription } from '../utils/Utilities';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const Subscriptions = ({ 
  selectedUser, 
  onClose, 
  localRows, 
  setLocalRows, 
  subscriptionValues, 
  setSubscriptionValues 
}) => {
 const [open, setOpen] = useState(false);

 const columns = [
  { field: 'actions',
   headerName: '',
   width: 150,
   renderCell: (params) => (
    <Button 
     sx={{ pl: 3 }} 
     size="small" 
     color="error" 
     onClick={(e) => {
      e.stopPropagation();
      deleteSub(params?.row?.subId);
      handleDelete(params?.row?.id);
     }}>
     {Constants.BUTTONS.DELETE}</Button>
   ),
   sortable: false,
   filterable: false,
   disableColumnMenu: true
  },
  { field: 'date', headerName: 'Date', width: 150 },
  { field: 'product', headerName: 'Product', width: 150},
  { field: 'price', headerName: 'Price', width: 150 },
  { field: 'vehicle',
   headerName: 'Vehicle',
   width: 300,
   renderCell: (params) => (
    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: '100%', pt: 1 }}>
      <FormControl fullWidth sx={{ width: 250 }}>
        <InputLabel>{Constants.UI_TEXT.VEHICLE}</InputLabel>
        <Select
          value={params.row.vehicle || "SELECT VEHICLE"}
          onChange={(e) => {
            const updatedRows = localRows.map((row) =>
              row.id === params.row.id ? { ...row, vehicle: e.target.value } : row
            );
            setLocalRows(updatedRows);
            const updatedRow = updatedRows.find(row => row.id === params.row.id);
            console.log('Updated row:', updatedRow);
            if (updatedRow) {
              modifySubscription(updatedRow);
            }
          }}>
          {selectedUser?.vehicles?.map((vehicle, index) => (
            <MenuItem key={index} value={vehicle}>{vehicle}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
   ),
   sortable: false,
   filterable: false,
   disableColumnMenu: true
  }
 ];

 const handleDelete = (id) => {
  const updatedSubscriptions = [...localRows];
  updatedSubscriptions.splice(id, 1);
  setLocalRows(updatedSubscriptions);
 };

 const handleCreate = () => {
  const newSubscription = {
   id: localRows.length,
   subId: subscriptionValues.subId,
   userId: selectedUser.id,
   date: subscriptionValues.date,
   product: subscriptionValues.product,
   vehicle: subscriptionValues.vehicle || selectedUser.vehicles[0],
   price: subscriptionValues.price,
  };
  createSubscription(newSubscription);
  const updatedSubscriptions = [...localRows, newSubscription];
  setLocalRows(updatedSubscriptions);
 };

 return (
  <>
  <Stack direction="row" spacing={3} >
   <Typography variant="h5" sx={{ pl: 4, pt:2, pb: 2 }}>{Constants.UI_TEXT.SUBSCRIPTIONS}</Typography>
   {!open && <Button sx={{ width: 200, height: 40, alignSelf: 'center' }} variant="contained" color="primary" onClick={e => { e.stopPropagation();  setOpen(true); }}>{Constants.BUTTONS.ADD_SUBSCRIPTION}</Button>}
  </Stack>

  {!open ? 
  <Stack direction="row" spacing={3} sx={{ pb:"25px", pl: 4, pr: 4 }}>
   <Stack sx={{ ml: 4, mr: 4, flex: 1, height: '400px', width: '100%' }}>
    <DataGrid
     showToolbar
     rows={localRows}
     columns={columns}
     pageSize={5}
     rowsPerPageOptions={[5, 10, 20]}
     disableSelectionOnClick
     rowHeight={75}
    />
   </Stack>
  </Stack>
  : <Stack sx={{ flex: 2, mt: 4 }}>
   <Card sx={{ pb:"25px", pl: 4, pr: 4 }}>
    <CardHeader title={Constants.UI_TEXT.CREATE_SUBSCRIPTION} />
    <Divider />
    <CardContent>
    <Grid container spacing={3}>
     
     <Grid>
      <FormControl fullWidth sx={{ width: 250 }}>
       <InputLabel>{Constants.UI_TEXT.VEHICLE}</InputLabel>
       <Select
          value={subscriptionValues.vehicle || (selectedUser.vehicles[0] || "SELECT VEHICLE")}
          onChange={(e) => {
          setSubscriptionValues({ ...subscriptionValues, vehicle: e.target.value });
          }}
          label={Constants.UI_TEXT.VEHICLE}
          name="vehicle">
          {selectedUser?.vehicles?.map((vehicle, index) => (
            <MenuItem key={index} value={vehicle}>{vehicle}</MenuItem>
          ))}
       </Select>
      </FormControl>
     </Grid>
     
     <Grid>
      <FormControl fullWidth sx={{ width: 250 }}>
       <InputLabel>{Constants.UI_TEXT.PRODUCT}</InputLabel>
       <Select
        value={subscriptionValues.product || (selectedUser.product || "LIFETIME")}
        onChange={(e) => {
         setSubscriptionValues({ ...subscriptionValues, product: e.target.value });
        }}
        label={Constants.UI_TEXT.PRODUCT}
        name="product">
        <MenuItem value="LIFETIME">Lifetime</MenuItem>
        <MenuItem value="ANNUAL">Annual</MenuItem>
        <MenuItem value="MONTHLY">Monthly</MenuItem>
       </Select>
      </FormControl>
     </Grid>
    </Grid>
    </CardContent>
   </Card>

   <Stack direction="row" justifyContent="space-between" sx={{ mt: 2 }}>
    <Button variant="outlined" onClick={() => setOpen(false)} sx={{ width: 120, ml:6, mt:4}}>
     {Constants.BUTTONS.CANCEL}
    </Button>
    <Button variant="contained" onClick={() => {setOpen(false); handleCreate();}} sx={{ width: 120, mr:6, mt:4 }}>
     {Constants.BUTTONS.SAVE}
    </Button>
   </Stack>
  </Stack>}

  
  {!open &&
    <Button variant="outlined" onClick={onClose} sx={{ width: 120, ml:4 }}>
    {Constants.BUTTONS.CLOSE}
    </Button>
  }
  </>
 );
};

export default Subscriptions;