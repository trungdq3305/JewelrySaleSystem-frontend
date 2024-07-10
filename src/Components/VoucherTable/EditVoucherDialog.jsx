import { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Paper, Snackbar, Alert } from '@mui/material';

const EditVoucherDialog = ({ openDialog, handleCloseDialog, onEditVoucher, formData, setFormData }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'expiredDay' || name === 'publishedDay') {
      const date = new Date(value);
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate(),
        },
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleEditVoucher = () => {
    const requiredFields = ['createdBy', 'expiredDay.year', 'expiredDay.month', 'expiredDay.day', 'cost', 'customerCustomerId'];
    const isFormValid = requiredFields.every(field => {
      const [mainKey, subKey] = field.split('.');
      return subKey ? formData[mainKey] && formData[mainKey][subKey] : formData[mainKey];
    });

    if (!isFormValid) {
      setSnackbarMessage('Please fill in all required fields.');
      setSnackbarOpen(true);
      return;
    }

    onEditVoucher(formData);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const formatDateString = (date) => {
    if (!date) return '';
    const year = date.year || 0;
    const month = String(date.month || 0).padStart(2, '0');
    const day = String(date.day || 0).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit Voucher</DialogTitle>
        <DialogContent>
          <Paper variant="outlined" component="form" sx={{ margin: 2, padding: 2 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="createdBy"
              label="Created By"
              value={formData.createdBy}
              onChange={handleChange}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="expiredDay"
              label="Expired Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formData.expiredDay}
              onChange={handleChange}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="cost"
              label="Cost"
              type="number"
              value={formData.cost}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="customerCustomerId"
              label="Customer ID"
              value={formData.customerCustomerId}
              onChange={handleChange}
            />
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleEditVoucher} variant="contained" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="warning" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default EditVoucherDialog;
