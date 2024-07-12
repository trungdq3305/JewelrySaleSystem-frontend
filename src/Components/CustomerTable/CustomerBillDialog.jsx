import React from 'react'
import PropTypes from 'prop-types'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, List, ListItem, ListItemText } from '@mui/material'

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const CustomerBillDialog = ({ open, onClose, bills }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Bills</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {bills.length > 0 ? (
            <List>
              {bills.map((bill) => (
                <ListItem key={bill.billId}>
                  <ListItemText
                    primary={`Bill ID: ${bill.billId}`}
                    secondary={`Total Cost: ${bill.totalCost} | Publish Day: ${formatDate(bill.publishDay)}`}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <p>No bills available for this customer.</p>
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

CustomerBillDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  bills: PropTypes.arrayOf(
    PropTypes.shape({
      billId: PropTypes.string.isRequired,
      totalCost: PropTypes.number.isRequired,
      publishDay: PropTypes.string.isRequired,
    })
  ).isRequired,
};

CustomerBillDialog.defaultProps = {
  bills: [],
};

export default CustomerBillDialog;