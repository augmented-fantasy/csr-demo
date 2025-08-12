'use client';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import UserDetails from './UserDetails';
import * as Constants from '../utils/Constants';
import Chip from '@mui/material/Chip';

const CustomersList = ({ 
  rows = [], 
  updateUser, 
  onDelete, 
  onClose, 
  signOut, 
  open, 
  setUsers,
  selectedUser,
  setSelectedUser,
  handleOpen,
  refetch,
  openPurchases,
  setOpenPurchases,
  openSubscriptions,
  setOpenSubscriptions
}) => {

  const columns = [
    { field: 'actions',
      headerName: '',
      width: 160,
      renderCell: (params) => (
        <>
          <Button disabled={open ? true : false} size="small" color="primary" onClick={e => { e.stopPropagation(); setSelectedUser(params.row); handleOpen(); }}>{Constants.BUTTONS.UPDATE}</Button>
          <Button disabled={open ? true : false} size="small" color="error" onClick={e => { e.stopPropagation(); onDelete?.(params.row, setUsers, refetch); }}>{Constants.BUTTONS.DELETE}</Button>
        </>
      ),
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      cellClassName: open ? 'MuiDataGrid-cell--disabled' : ''
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
      cellClassName: open ? 'MuiDataGrid-cell--disabled' : ''
    },
    { field: 'email', headerName: 'Email', width: 250, sortable: false, filterable: false, disableColumnMenu: true, cellClassName: open ? 'MuiDataGrid-cell--disabled' : '' },
    { field: 'location',
      headerName: 'Location',
      width: 300,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          {`${params.row.address?.street || ''} ${params.row.address?.city || ''} ${params.row.address?.state || ''}, ${params.row.address?.country || ''}`}
        </Box>
      ),
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      cellClassName: open ? 'MuiDataGrid-cell--disabled' : ''
    },
    { field: 'phone', headerName: 'Phone', width: 140, sortable: false, filterable: false, disableColumnMenu: true, cellClassName: open ? 'MuiDataGrid-cell--disabled' : ''},
    { field: 'purchases',
      headerName: 'Purchases',
      width: 90,
      renderCell: (params) => (
        <Box sx={{ ml: '30px' }}>
          {params?.row?.purchases?.items?.length || 0}
        </Box>
      ),
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      cellClassName: open ? 'MuiDataGrid-cell--disabled' : ''
    },
    { field: 'loyalty',
      headerName: 'Loyalty Points',
      width: 120,
      renderCell: (params) => (
        <Box sx={{ ml: '30px' }}>
          {params?.row?.loyalty && 
          <Box sx={{ ml: '25px' }}>
            <Chip color="primary" sx={{ width: '45px', mb: '5px' }} label={params?.row?.loyalty} size="small"/>
          </Box>
        }
        </Box>
      ),
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      cellClassName: open ? 'MuiDataGrid-cell--disabled' : ''
    }
  ];

  return (
    <><style>{`
        .MuiDataGrid-cell--disabled {
          pointer-events: none !important;
          color: #bdbdbd !important;
          opacity: 0.7;
        }
      `}</style>
      <Box sx={{ height: '100%', width: '1325px' }}>
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
      <UserDetails 
        onClose={onClose} 
        open={open} 
        signOut={signOut} 
        selectedUser={selectedUser} 
        updateUser={updateUser} 
        setUsers={setUsers}
        refetch={refetch}
        openPurchases={openPurchases}
        setOpenPurchases={setOpenPurchases}
        openSubscriptions={openSubscriptions}
        setOpenSubscriptions={setOpenSubscriptions}
      />
    </>
  );
}

export default CustomersList;
