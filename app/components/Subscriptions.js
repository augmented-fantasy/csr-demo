import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import * as Constants from '../utils/Constants';
import { DataGrid } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import { deleteSub } from '../utils/Utilities';
import { createSubscription } from '../utils/Utilities';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const Subscriptions = ({ selectedUser, onClose }) => {
    const [open, setOpen] = useState(false);
    const [localRows, setLocalRows] = useState([]);
    const [formValues, setFormValues] = useState({
        userId: selectedUser.id,
        product: "ANY",
        price: 9.99,
        vehicle: "ANY",
        date: new Date().toISOString().split('T')[0]
    });

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
      }, [selectedUser?.subscriptions?.items]);

    const handleDelete = (id) => {
        const updatedSubscriptions = [...localRows];
        updatedSubscriptions.splice(id, 1);
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
                    <FormControl fullWidth>
                        <InputLabel>{Constants.UI_TEXT.VEHICLE}</InputLabel>
                        <Select
                            value={formValues.vehicle}
                           onChange={(e) => {
                                setFormValues({ ...formValues, vehicle: e.target.value });
                            }}
                            label={Constants.UI_TEXT.VEHICLE}
                            name="vehicle"
                        >
                            <MenuItem value="ANY">Any</MenuItem>
                            <MenuItem value="CAR">Car</MenuItem>
                            <MenuItem value="BIKE">Bike</MenuItem>
                            <MenuItem value="TRUCK">Truck</MenuItem>
                            <MenuItem value="OTHER">Other</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                
                <Grid>
                    <FormControl fullWidth sx={{ width: 200 }}>
                        <InputLabel>{Constants.UI_TEXT.PRODUCT}</InputLabel>
                        <Select
                          value={formValues.product}
                          onChange={(e) => {
                            setFormValues({ ...formValues, product: e.target.value });
                        }}
                          label={Constants.UI_TEXT.PRODUCT}
                          name="product"
                        >
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
                {Constants.BUTTONS.DONE}
            </Button>
            <Button variant="contained" onClick={() => {setOpen(false); createSubscription(formValues);}} sx={{ width: 120, mr:6, mt:4 }}>
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
