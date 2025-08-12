import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import * as Constants from '../utils/Constants';
import { DataGrid } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import { deleteSub } from '../utils/Utilities';
import { createSubscription } from '../utils/Utilities';

const Subscriptions = ({ selectedUser, onClose, setUsers, refetch }) => {
    const [localRows, setLocalRows] = useState([]);

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
        { field: 'date', headerName: 'Date', width: 175 },
        { field: 'product', headerName: 'Product', width: 150},
        { field: 'price', headerName: 'Price', width: 100 },
        { field: 'vehicle',
            headerName: 'Vehicle',
            width: 250,
            renderCell: (params) => (
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: '100%' }}>
                <span>{params.row.vehicle}</span>
                <Button size="small" color="primary" onClick={e => { e.stopPropagation(); }}>{Constants.BUTTONS.CHANGE_VEHICLE}</Button>
            </Stack>
            ),
            sortable: false,
            filterable: false,
            disableColumnMenu: true
        }
    ];

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
      }, []);

    const handleDelete = (id) => {
        const updatedSubscriptions = [...localRows];
        updatedSubscriptions.splice(id, 1);
        setLocalRows(updatedSubscriptions);
    };

    return (
    <>
    <Stack direction="row" spacing={3} >
        <Typography variant="h5" sx={{ pl: 4, pt:2, pb: 2 }}>{Constants.UI_TEXT.SUBSCRIPTIONS}</Typography>
        <Button sx={{ width: 200, height: 40, alignSelf: 'center' }} variant="contained" color="primary" onClick={e => { e.stopPropagation(); createSubscription(); }}>{Constants.BUTTONS.ADD_SUBSCRIPTION}</Button>
        </Stack>
        <Stack direction="row" spacing={3} sx={{ pb:"25px", pl: 4, pr: 4 }}>
            <Stack sx={{ ml: 4, mr: 4, flex: 1, height: '400px', width: '100%' }}>
                <DataGrid
                    showToolbar
                    rows={localRows}
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

export default Subscriptions;
