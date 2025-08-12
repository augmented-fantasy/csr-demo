import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import * as Constants from '../utils/Constants';
import { DataGrid } from '@mui/x-data-grid';

const PurchasesInfo = ({ selectedUser, formValues, updateUser, onClose }) => {
   const columns = [
        { field: 'date', headerName: 'Date', width: 250 },
        { field: 'product', headerName: 'Product', width: 250},
        { field: 'vehicle', headerName: 'Vehicle', width: 250 },
        { field: 'price', headerName: 'Price', width: 100 },
    ];

    const rows = selectedUser.purchases.items.map((purchase, idx) => ({
      id: idx,
      date: purchase.date,
      product: purchase.product,
      vehicle: purchase.vehicle,
      price: purchase.price,
    }));

    return (
    <>
    <Stack direction="row" spacing={3} sx={{ m: 4 }}>
        <Stack sx={{ m: 4, flex: 1, height: '425px', width: '100%' }}>
            <DataGrid
                showToolbar
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5, 10, 20]}
                disableSelectionOnClick
            />
        </Stack>
    </Stack>
    <Stack direction="row" justifyContent="space-between" sx={{ ml: 4, mr: 4 }}>
        <Button variant="outlined" onClick={onClose} sx={{ width: 120 }}>
            {Constants.BUTTONS.CANCEL}
        </Button>
        <Button variant="contained" onClick={() => { updateUser(formValues); onClose(); }} sx={{ width: 120 }}>
            {Constants.BUTTONS.SAVE}
        </Button>
    </Stack>
    </>
  );
};

export default PurchasesInfo;
