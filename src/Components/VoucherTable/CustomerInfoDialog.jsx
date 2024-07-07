import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

const CustomerInfoDialog = ({ open, onClose, customerInfo }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Customer Information</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <strong>Customer ID:</strong> {customerInfo.customerId}
          <br />
          <strong>Full Name:</strong> {customerInfo.fullName}
          <br />
          <strong>Date od Birth:</strong> {customerInfo.doB}
          <br />
          <strong>Address:</strong> {customerInfo.address}
          <br />
          <strong>Email:</strong> {customerInfo.email}
          <br />
          <strong>Phone Number:</strong> {customerInfo.phone}
          <br />
          <strong>Point:</strong> {customerInfo.point}
          <br />
          <strong>Rate:</strong> {customerInfo.rate}
          <br />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomerInfoDialog;