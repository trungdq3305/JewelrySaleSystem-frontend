import { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Paper, Snackbar, Alert } from '@mui/material';

const AddVoucherDialog = ({ openDialog, handleCloseDialog, onAddVoucher, initialFormData }) => {
  const [formData, setFormData] = useState(initialFormData);
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

  const handleAddVoucher = () => {
    const requiredFields = ['cost','customerCustomerId', 'expiredDay.year', 'expiredDay.month', 'expiredDay.day', 'publishedDay.year', 'publishedDay.month', 'publishedDay.day'];
    const isFormValid = requiredFields.every(field => {
      const [mainKey, subKey] = field.split('.');
      return subKey ? formData[mainKey] && formData[mainKey][subKey] : formData[mainKey];
    });

    if (!isFormValid) {
      setSnackbarMessage('Please fill in all required fields.');
      setSnackbarOpen(true);
      return;
    }

    onAddVoucher(formData);
    setFormData(initialFormData); // Reset the form
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
        <DialogTitle>Add Voucher</DialogTitle>
        <DialogContent>
          <Paper variant="outlined" component="form" sx={{ margin: 2, padding: 2 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="customerCustomerId"
              label="Customer ID"
              value={formData.customerCustomerId}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="cost"
              label="Cost ( < 100000 )"
              value={formData.cost}
              onChange={handleChange}
            />
            
            <div>Expired Day</div>
            <TextField
              margin="normal"
              required
              fullWidth
              name="expiredDay"
              label="Expired Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formatDateString(formData.expiredDay)}
              onChange={handleChange}
            />
            <div>Published Day</div>
            <TextField
              margin="normal"
              required
              fullWidth
              name="publishedDay"
              label="Published Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formatDateString(formData.publishedDay)}
              onChange={handleChange}
            />
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleAddVoucher} variant="contained" autoFocus>
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

export default AddVoucherDialog;
