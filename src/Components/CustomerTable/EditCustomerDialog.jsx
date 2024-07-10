import { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Paper, Snackbar, Alert } from '@mui/material';

const EditCustomerDialog = ({ openDialog, handleCloseDialog, onEditCustomer, formData, setFormData }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    const [mainKey, subKey] = name.split('.');

    const isNumericField = ['cost'].includes(name);

    if (isNumericField && value !== '' && isNaN(value)) {
      return;
    }

    const parsedValue = isNumericField ? parseInt(value, 10) : value;

    if (subKey) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [mainKey]: {
          ...prevFormData[mainKey],
          [subKey]: parsedValue
        }
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: parsedValue
      }));
    }
  };

  const handleEditCustomer = () => {
    const requiredFields = ['fullName', 'doB.year', 'doB.month', 'doB.day', 'address', 'email', 'phone', 'point', 'rate'];
    const isFormValid = requiredFields.every(field => {
      const [mainKey, subKey] = field.split('.');
      return subKey ? formData[mainKey] && formData[mainKey][subKey] : formData[mainKey];
    });

    if (!isFormValid) {
      setSnackbarMessage('Please fill in all required fields.');
      setSnackbarOpen(true);
      return;
    }

    // Format the date of birth to ISO 8601 format
    const year = formData.doB.year;
    const month = formData.doB.month - 1; // Months are 0-indexed in JS Date
    const day = formData.doB.day;
    const formattedDOB = new Date(Date.UTC(year, month, day)).toISOString();

    // Create a new form data object with formatted DOB
    const updatedFormData = { ...formData, doB: formattedDOB };
    console.log(updatedFormData)
    onEditCustomer(updatedFormData);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit Customer</DialogTitle>
        <DialogContent>
          <Paper variant="outlined" component="form" sx={{ margin: 2, padding: 2 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="fullName"
              label="Name"
              value={formData.fullName}
              onChange={handleChange}
            />
            <div>Date of Birth</div>
            <TextField
              margin="normal"
              required
              fullWidth
              name="doB.year"
              label="Year"
              type="number"
              value={formData.doB.year}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="doB.month"
              label="Month"
              type="number"
              value={formData.doB.month}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="doB.day"
              label="Day"
              type="number"
              value={formData.doB.day}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="address"
              label="Address"
              value={formData.address}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="phone"
              label="Phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="point"
              label="Point"
              value={formData.point}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="rate"
              label="Rate"
              value={formData.rate}
              onChange={handleChange}
            />
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleEditCustomer} variant="contained" autoFocus>
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

export default EditCustomerDialog;
