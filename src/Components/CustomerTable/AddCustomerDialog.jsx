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
    const { name, value } = event.target
    const [mainKey, subKey] = name.split('.')

    if (subKey) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [mainKey]: {
          ...prevFormData[mainKey],
          [subKey]: value,
        },
      }))
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }))
    }
  }

  const handleAddCustomer = () => {
    const requiredFields = [
      'fullName',
      'doB.year',
      'doB.month',
      'doB.day',
      'address',
      'email',
      'phone',
    ]
    const isFormValid = requiredFields.every((field) => {
      const [mainKey, subKey] = field.split('.')
      return subKey
        ? formData[mainKey] && formData[mainKey][subKey]
        : formData[mainKey]
    })

    if (!isFormValid) {
      setSnackbarMessage('Please fill in all required fields.')
      setSnackbarOpen(true)
      return
    }

    // Combine year, month, and day into a single ISO date string
    const { year, month, day } = formData.doB
    const doB = moment.utc({ year, month: month - 1, day }).toISOString()

    const formattedFormData = {
      fullName: formData.fullName,
      doB,
      address: formData.address,
      email: formData.email,
      phone: formData.phone,
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
              name="status"
              label="Status"
              value={formData.status}
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
