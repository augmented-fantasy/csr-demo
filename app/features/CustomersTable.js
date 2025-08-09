'use client';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { mapSubscriptions } from "../utils/Utilities";
import UserPopover from './Popover';

const CustomersTable = ({ 
  rows = [], 
  onUpdate, 
  onDelete, 
  onClose, 
  signOut, 
  open, 
  setUsers,
  selectedUser,
  setSelectedUser,
  handleOpen
}) => {

  const columns = [
    { field: 'actions',
      headerName: '',
      width: 160,
      renderCell: (params) => (
        <>
          <Button disabled={open ? true : false} size="small" color="primary" onClick={e => { e.stopPropagation(); setSelectedUser(params.row); handleOpen(); }}>Update</Button>
          <Button disabled={open ? true : false} size="small" color="error" onClick={e => { e.stopPropagation(); onDelete?.(params.row, setUsers); }}>Delete</Button>
        </>
      ),
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      cellClassName: 'MuiDataGrid-cell--disabled',
    },
    { field: 'name',
      headerName: 'Name',
      width: 250,
      renderCell: (params) => (
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', height: '100%' }}>
          <Avatar src={`/assets/avatar-${params.row?.avatar || "8"}.png`} />
          <Typography variant="subtitle2">{params.row.name}</Typography>
        </Stack>
      ),
      sortable: true,
      filterable: false,
      disableColumnMenu: true,
      cellClassName: 'MuiDataGrid-cell--disabled',
    },
    { field: 'email', headerName: 'Email', width: 250, sortable: false, filterable: false, disableColumnMenu: true, cellClassName: 'MuiDataGrid-cell--disabled', },
    { field: 'location',
      headerName: 'Location',
      width: 350,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          {`${params.row.street || ''} ${params.row.city || ''} ${params.row.state || ''}, ${params.row.country || ''}`}
        </Box>
      ),
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      cellClassName: 'MuiDataGrid-cell--disabled',
    },
    { field: 'phone', headerName: 'Phone', width: 140, sortable: false, filterable: false, disableColumnMenu: true, cellClassName: 'MuiDataGrid-cell--disabled', },
    { field: 'subscriptions',
      headerName: 'Subscriptions',
      width: 160,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          {mapSubscriptions(params.row.subscriptions)}
        </Box>
      ),
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      cellClassName: 'MuiDataGrid-cell--disabled',
    },
    { field: 'purchaseHistory', headerName: 'Purchase History', width: 180, sortable: false, filterable: false, disableColumnMenu: true, cellClassName: 'MuiDataGrid-cell--disabled', },
  ];

  return (
    <>
      <Box sx={{ height: '100%', width: '1500px' }}>
        <DataGrid
        sx={{
          [`& .${gridClasses.cell}:focus`]: {
            outline: 'none',
          },
          [`& .${gridClasses.cell}:focus-within`]: {
            outline: 'none',
          },
          [`& .${gridClasses.columnHeader}:focus`]: {
            outline: 'none',
          },
          [`& .${gridClasses.columnHeader}:focus-within`]: {
            outline: 'none',
          },
        }}
          showToolbar
          disableColumnFilter
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          disableSelectionOnClick
          disableRowSelectionOnClick
          onRowClick={(params) => {
            setSelectedUser(params.row);
            handleOpen();
          }}
          getRowId={row => row.id}
        />
      </Box>
      <Divider />
      <UserPopover onClose={onClose} open={open} signOut={signOut} selectedUser={selectedUser} onUpdate={onUpdate}  />
    </>
  );
}

export default CustomersTable;
