import { useState } from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Paper,
  Snackbar,
  Alert,
} from '@mui/material'
import moment from 'moment'

const AddCustomerDialog = ({
  openDialog,
  handleCloseDialog,
  onAddCustomer,
  initialFormData,
}) => {
  const [formData, setFormData] = useState(initialFormData)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleAddCustomer = () => {
    const requiredFields = ['fullName', 'doB', 'address', 'email', 'phone'];
    const isFormValid = requiredFields.every(field => formData[field]);

    if (!isFormValid) {
      setSnackbarMessage('Please fill in all required fields.')
      setSnackbarOpen(true)
      return
    }

    const formattedFormData = {
      ...formData,
      status: true, // Automatically set status to true
    }

    onAddCustomer(formattedFormData)
    setFormData(initialFormData) // Reset the form
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false)
  }

  return (
    <>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add Customer</DialogTitle>
        <DialogContent>
          <Paper
            variant="outlined"
            component="form"
            sx={{ margin: 2, padding: 2 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              name="fullName"
              label="Name"
              value={formData.fullName}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="doB"
              label="Date of Birth"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formData.doB}
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
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleAddCustomer} variant="contained" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="warning"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  )
}

export default AddCustomerDialog
