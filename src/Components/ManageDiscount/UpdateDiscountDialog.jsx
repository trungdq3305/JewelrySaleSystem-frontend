import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';

const UpdateDiscountDialog = ({ openDialog, handleCloseDialog, onUpdateDiscount, formData, setFormData }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    if (formData) {
      setFormData(formData);
    }
  }, [formData, setFormData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleUpdateDiscount = async () => {
    const requiredFields = ['discountId', 'expiredDay', 'publishDay', 'cost'];
    const isFormValid = requiredFields.every((field) => formData[field] !== '' && formData[field] !== undefined);

    if (!isFormValid) {
      setSnackbarMessage('Please fill in all required fields.');
      setSnackbarOpen(true);
      return;
    }

    // Convert dates to ISO format
    const updatedFormData = {
      ...formData,
      expiredDay: new Date(formData.expiredDay).toISOString().split('T')[0], // Format to YYYY-MM-DD
      publishDay: new Date(formData.publishDay).toISOString().split('T')[0], // Format to YYYY-MM-DD
    };

    try {
      await onUpdateDiscount(updatedFormData);
      setSnackbarMessage('Discount updated successfully!');
      setSnackbarOpen(true);
      handleCloseDialog();
    } catch (error) {
      console.error('Error updating discount:', error);
      setSnackbarMessage('Error updating discount.');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Update Discount</DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            required
            fullWidth
            name="discountId"
            label="Discount ID"
            value={formData.discountId || ''}
            onChange={handleChange}
            disabled
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="expiredDay"
            label="Expired Day"
            type="date" // Use "date" for DateOnly
            value={formData.expiredDay ? formData.expiredDay.slice(0, 10) : ''} // Format to YYYY-MM-DD
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="publishDay"
            label="Publish Day"
            type="date" // Use "date" for DateOnly
            value={formData.publishDay ? formData.publishDay.slice(0, 10) : ''} // Format to YYYY-MM-DD
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="cost"
            label="Cost"
            type="number"
            value={formData.cost || 0}
            onChange={handleChange}
            inputProps={{ min: 0 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleUpdateDiscount} variant="contained" autoFocus>Update</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarMessage.includes('Error') ? 'error' : 'success'} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

UpdateDiscountDialog.propTypes = {
  openDialog: PropTypes.bool.isRequired,
  handleCloseDialog: PropTypes.func.isRequired,
  onUpdateDiscount: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
};

export default UpdateDiscountDialog;
