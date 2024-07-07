import { useState } from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, FormControlLabel, Checkbox, MenuItem, Select, FormControl, InputLabel, Button, Paper } from '@mui/material'


const ActiveDeactiveDialog = ({ openDialog, handleCloseDialog, onActiveDeactive}) => {
  return (
    <Dialog open={openDialog} onClose={handleCloseDialog}>
      <DialogTitle>Active/Deactive Account</DialogTitle>
      <DialogContent>
        Active/Deactive this account ?
      </DialogContent>
      <DialogActions>
        <Button>Cancel</Button>
        <Button>Confirm</Button>
      </DialogActions>
    </Dialog>
  )
}
export default ActiveDeactiveDialog