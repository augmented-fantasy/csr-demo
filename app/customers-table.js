'use client';

import React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { mapSubscriptions } from "./utilities";
import UserPopover from './popover';

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
  return (
    <>
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Subscriptions</TableCell>
              <TableCell>Purchase History</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow hover key={row?.id} onClick={() => {
                  setSelectedUser(row)
                  handleOpen()
                }}>
                  <TableCell>
                    <Button disabled={open ? true : false} size="small" color={"primary"} onClick={() => {
                      setSelectedUser(row)
                      handleOpen()
                    }}>
                      Update
                    </Button>
                    <Button disabled={open ? true : false} size="small" color={"error"} onClick={() => onDelete?.(row, setUsers)}>
                      Delete
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                      <Avatar src={`/assets/avatar-${row?.avatar || "8"}.png`} />
                      <Typography variant="subtitle2">{row.name}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{row?.email}</TableCell>
                  <TableCell>
                    {row?.street} {row?.city} {row?.state}, {row?.country}
                  </TableCell>
                  <TableCell>{row?.phone}</TableCell>
                  <TableCell>{mapSubscriptions(row?.subscriptions)}</TableCell>
                  <TableCell>{row?.purchaseHistory}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
    </Card>
    <UserPopover onClose={onClose} open={open} signOut={signOut} selectedUser={selectedUser} onUpdate={onUpdate}  />
    </>
  );
}

export default CustomersTable;
