import React, { useEffect, useState } from 'react';
import { getAllVouchers } from '../../Configs/axios';
import moment from 'moment';
import { Grid, Typography, Paper, Table, TableContainer, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import styles from './VoucherList.module.scss';

const VoucherList = () => {
  const [vouchers, setVouchers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllVouchers();
        setVouchers(data);
      } catch (error) {
        console.error('Error fetching vouchers:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.voucherList}>
      <Typography variant="h4" gutterBottom>Voucher List</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Voucher ID</TableCell>
              <TableCell>Created By</TableCell>
              <TableCell>Expired Day</TableCell>
              <TableCell>Published Day</TableCell>
              <TableCell>Cost</TableCell>
              <TableCell>Customer ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(vouchers.data) && vouchers.data.length > 0 ? (
              vouchers.data.map(voucher => (
                <TableRow key={voucher.voucherId}>
                  <TableCell>{voucher.voucherId}</TableCell>
                  <TableCell>{voucher.createdBy}</TableCell>
                  <TableCell>{moment(voucher.expiredDay).format('YYYY-MM-DD')}</TableCell>
                  <TableCell>{moment(voucher.publishedDay).format('YYYY-MM-DD')}</TableCell>
                  <TableCell>{voucher.cost}</TableCell>
                  <TableCell>{voucher.customerCustomerId}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">No vouchers found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default VoucherList;
