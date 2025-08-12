import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import * as Constants from '../utils/Constants';
import { DataGrid } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import { deleteSub } from '../utils/Utilities';

const Subscriptions = ({ selectedUser, onClose, setUsers, refetch }) => {
    const [localRows, setLocalRows] = useState([]);

    const columns = [
        { field: 'actions',
            headerName: '',
            width: 200,
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
        { field: 'vehicle',
            headerName: 'Vehicle',
            width: 250,
            renderCell: (params) => (
            <>  {params.row.vehicle}
                <Button size="small" color="primary" onClick={e => { e.stopPropagation(); }}>{Constants.BUTTONS.CHANGE_VEHICLE}</Button>
            </>
            ),
            sortable: false,
            filterable: false,
            disableColumnMenu: true
        },
        { field: 'price', headerName: 'Price', width: 100 }
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
        console.log('Updated Subscriptions:', updatedSubscriptions);
    };

    return (
    <>
    <Stack direction="row" spacing={3} >
        <Typography variant="h5" sx={{ p: 2 }}>{Constants.UI_TEXT.SUBSCRIPTIONS}</Typography>
        <Button sx={{ width: 200, height: 40, alignSelf: 'center' }} variant="contained" color="primary" onClick={e => { e.stopPropagation(); onDelete?.(params.row, setUsers, refetch); }}>{Constants.BUTTONS.ADD_SUBSCRIPTION}</Button>
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
