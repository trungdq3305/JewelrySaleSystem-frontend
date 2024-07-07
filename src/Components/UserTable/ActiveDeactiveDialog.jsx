import { useState } from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, FormControlLabel, Checkbox, MenuItem, Select, FormControl, InputLabel, Button, Paper } from '@mui/material'


const ActiveDeactiveDialog = ({ openDialog, handleCloseDialog, onConfirm}) => {
  return (
    <Dialog open={openDialog} onClose={handleCloseDialog}>
      <DialogTitle>Active/Deactive Account</DialogTitle>
      <DialogContent>
        Active/Deactive this account ?
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Cancel</Button>
        <Button onClick={onConfirm}>Confirm</Button>
      </DialogActions>
    </Dialog>
  )
}
export default ActiveDeactiveDialog