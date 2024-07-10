import { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, FormControlLabel, Checkbox, Button, Paper, Snackbar, Alert } from '@mui/material';

const AddVoucherDialog = ({ openDialog, handleCloseDialog, onAddVoucher, initialFormData }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [propChecks, setPropChecks] = useState({
    isExpired: false,
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    const [mainKey, subKey] = name.split('.');

    if (subKey) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [mainKey]: {
          ...prevFormData[mainKey],
          [subKey]: value,
        },
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setPropChecks((prevChecks) => ({
      ...prevChecks,
      [name]: checked,
    }));

    if (checked) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        expiredDay: {
          year: '',
          month: '',
          day: '',
        },
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        expiredDay: {
          year: 0,
          month: 0,
          day: 0,
        },
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
    setPropChecks({
      isExpired: false,
    });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
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
              name="expiredDay.year"
              label="Year"
              type="number"
              value={formData.expiredDay.year}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="expiredDay.month"
              label="Month"
              type="number"
              value={formData.expiredDay.month}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="expiredDay.day"
              label="Day"
              type="number"
              value={formData.expiredDay.day}
              onChange={handleChange}
            />
            <div>Published Day</div>
            <TextField
              margin="normal"
              required
              fullWidth
              name="publishedDay.year"
              label="Year"
              type="number"
              value={formData.publishedDay.year}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="publishedDay.month"
              label="Month"
              type="number"
              value={formData.publishedDay.month}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="publishedDay.day"
              label="Day"
              type="number"
              value={formData.publishedDay.day}
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
