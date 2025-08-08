'use client';

import * as React from 'react';
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

const CustomersTable = ({ rows = [], onUpdate, onDelete  }) => {

  return (
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
                <TableRow hover key={row?.id}>
                  <TableCell>
                    <Button size="small" color="primary" onClick={() => onUpdate?.(row)}>
                      Update
                    </Button>
                    <Button size="small" color="error" onClick={() => onDelete?.(row)}>
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
  );
}

export default CustomersTable;
