import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import * as Constants from '../utils/Constants';
import { DataGrid } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';

const Subscriptions = ({ selectedUser, onClose }) => {
   const columns = [
        { field: 'actions',
            headerName: '',
            width: 125,
            renderCell: (params) => (
            <>
                <Button sx={{ pl: 3 }} size="small" color="error" onClick={e => { e.stopPropagation(); onDelete?.(params.row, setUsers, refetch); }}>{Constants.BUTTONS.REFUND}</Button>
            </>
            ),
            sortable: false,
            filterable: false,
            disableColumnMenu: true
        },
        { field: 'date', headerName: 'Date', width: 150 },
        { field: 'product', headerName: 'Product', width: 150},
        { field: 'vehicle',
            headerName: 'Vehicle',
            width: 250,
            renderCell: (params) => (
            <>  {params.row.vehicle}
                <Button size="small" color="primary" onClick={""} sx={{ pl: 4 }}>{Constants.BUTTONS.CHANGE_VEHICLE}</Button>
            </>
            ),
            sortable: false,
            filterable: false,
            disableColumnMenu: true
        },
        { field: 'price', headerName: 'Price', width: 100 }
    ];

    const rows = selectedUser?.subscriptions?.items?.map((subscriptions, idx) => ({
      id: idx,
      date: subscriptions.date,
      product: subscriptions.product,
      vehicle: subscriptions.vehicle,
      price: subscriptions.price,
    }));

    return (
    <>
    <Typography variant="h6" sx={{ p: 2 }}>{Constants.UI_TEXT.SUBSCRIPTIONS}</Typography>
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
    <Stack direction="row" justifyContent="space-between" sx={{ ml: 4, mr: 4 }}>
        <Button variant="outlined" onClick={onClose} sx={{ width: 120 }}>
            {Constants.BUTTONS.EXIT}
        </Button>
        <Button variant="contained" sx={{ width: 120 }}>
            {Constants.BUTTONS.SAVE}
        </Button>
    </Stack>
    </>
  );
};

export default Subscriptions;
