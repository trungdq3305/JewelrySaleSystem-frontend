import { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

const AddDiscountDialog = ({ openDialog, handleCloseDialog, onAddDiscount, initialFormData }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleAddNewDiscount = () => {
    const requiredFields = [ 'expiredDay', 'publishDay', 'cost'];
    const isFormValid = requiredFields.every((field) => formData[field] !== '' && formData[field] !== undefined);

    if (!isFormValid) {
      setSnackbarMessage('Please fill in all required fields.');
      setSnackbarOpen(true);
      handleCloseDialog();
      return;
    }

    onAddDiscount(formData);
    setFormData(initialFormData); 
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add Discount</DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            required
            fullWidth
            name="publishDay"
            label="Publish Day"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            value={formData.publishDay}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="expiredDay"
            label="Expired Day"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            value={formData.expiredDay}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="cost"
            label="cost"
            type="number"
            value={formData.cost}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleAddNewDiscount} variant="contained" autoFocus>
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

export default AddDiscountDialog;
