import React, { useState } from 'react';
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

const UpdateGemDialog = ({
  openDialog,
  handleCloseDialog,
  onUpdateGem,
  formData,
  setFormData,
}) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleUpdateGem = () => {
    const requiredFields = ['name', 'type', 'price', 'desc', 'rate'];
    const isFormValid = requiredFields.every((field) => formData[field] !== '');

    if (!isFormValid) {
      setSnackbarMessage('Please fill in all required fields.');
      setSnackbarOpen(true);
      return;
    }

    onUpdateGem(formData);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Update Gem</DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            required
            fullWidth
            name="gemId"
            label="Gem ID"
            value={formData.gemId}
            onChange={handleChange}
            disabled
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="type"
            label="Type"
            type="number"
            value={formData.type}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="price"
            label="Price"
            type="number"
            value={formData.price}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="desc"
            label="Description"
            value={formData.desc}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="rate"
            label="Rate"
            type="number"
            value={formData.rate}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleUpdateGem} variant="contained" autoFocus>
            Update
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

export default UpdateGemDialog;
