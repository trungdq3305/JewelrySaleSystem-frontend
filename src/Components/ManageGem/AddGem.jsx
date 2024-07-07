import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';

const AddGem = ({
  openDialog,
  handleCloseDialog,
  onAddGem,
  initialFormData,
}) => {
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onAddGem(formData);
  };

  return (
    <Dialog open={openDialog} onClose={handleCloseDialog}>
      <DialogTitle>Add New Gem</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Gem Name"
          type="text"
          fullWidth
          name="gemName"
          value={formData.gemName}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Gem Type"
          type="text"
          fullWidth
          name="gemType"
          value={formData.gemType}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Gem Price"
          type="number"
          fullWidth
          name="gemPrice"
          value={formData.gemPrice}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Gem Description"
          type="text"
          fullWidth
          name="gemDesc"
          value={formData.gemDesc}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Gem Rate"
          type="number"
          fullWidth
          name="gemRate"
          value={formData.gemRate}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">
          Add Gem
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddGem;
