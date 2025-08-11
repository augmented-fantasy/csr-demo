import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import * as Constants from '../utils/Constants';
import { DataGrid } from '@mui/x-data-grid';

const PurchasesInfo = ({ selectedUser, formValues, updateUser, onClose }) => {
   const columns = [
        { field: '0', headerName: '0', width: 150 },
        { field: '1', headerName: '1', width: 150 },
        { field: '2', headerName: '2', width: 150 },
        { field: 'amount', headerName: 'Amount', width: 110 },
    ];

    const rowsArray = selectedUser.purchases.vehicle.map((purchase, index) => ({
        id: index,
        ...purchase,
    }));

    const rows2 = rowsArray.reduce((acc, _, index) => {
        acc[index] = {
            id: index, // Add unique id
            vehicle: selectedUser.purchases.vehicle[index],
        };
        return acc;
    }, {});

    const { id, vehicle } = rows2;

    console.log(rows2)
  
    return (
    <>
    <Stack direction="row" spacing={3} sx={{ m: 4 }}>
        <Stack sx={{ m: 4, flex: 1, height: '425px'}}>
            <DataGrid
                rows={rows2}
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
