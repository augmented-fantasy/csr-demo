import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import * as Constants from '../utils/Constants';
import { DataGrid } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';

const PurchasesInfo = ({ selectedUser, onClose }) => {
   const columns = [
        { field: 'date', headerName: 'Date', width: 250 },
        { field: 'product', headerName: 'Product', width: 250},
        { field: 'vehicle', headerName: 'Vehicle', width: 250 },
        { field: 'price', headerName: 'Price', width: 100 },
    ];

    const rows = selectedUser?.purchases?.items.map((purchase, idx) => ({
      id: idx,
      date: purchase.date,
      product: purchase.product,
      vehicle: purchase.vehicle,
      price: purchase.price,
    }));

    return (
    <>
    <Typography variant="h5" sx={{ pl: 4, pt:2, pb: 2 }}>{Constants.UI_TEXT.PURCHASES}</Typography>
    <Stack direction="row" spacing={3} sx={{ pb:"25px", pl: 4, pr: 4 }}>
        
        <Stack sx={{ ml: 4, mr: 4, flex: 1, height: '400px', width: '100%' }}>
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
    <Button variant="outlined" onClick={onClose} sx={{ width: 120, ml:4 }}>
        {Constants.BUTTONS.EXIT}
    </Button>
    </>
  );
};

export default PurchasesInfo;
