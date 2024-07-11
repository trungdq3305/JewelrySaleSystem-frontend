import React from 'react'
import style from '../CustomerList/CustomerList.module.scss'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Button,
} from '@mui/material'

const CustomerList = ({ customerList, addCustomer }) => {
  return (
    <div className={style.customerListContainer}>
      {customerList && customerList.length > 0 ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>DoB</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Point</TableCell>
              <TableCell>Rate</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customerList.map((customer) => (
              <TableRow key={customer.customerId}>
                <TableCell>{customer.customerId}</TableCell>
                <TableCell>{customer.fullName}</TableCell>
                <TableCell>
                  {new Date(customer.doB).toLocaleDateString()}
                </TableCell>
                <TableCell>{customer.address}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{customer.point}</TableCell>
                <TableCell>{customer.rate}</TableCell>
                {customer.status === true ? (
                  <TableCell>active</TableCell>
                ) : (
                  <TableCell sx={{ color: 'red' }}>inactive</TableCell>
                )}
                <TableCell>
                  <Button
                    onClick={() => addCustomer(customer)}
                    variant="contained"
                    sx={{
                      background: 'black',
                      color: '#ffdbf0',

                      '&:hover': {
                        backgroundColor: '#ffdbf0',
                        color: 'black',
                      },
                    }}
                  >
                    Add
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Typography variant="h6" align="center">
          No customers available.
        </Typography>
      )}
    </div>
  )
}

export default CustomerList
