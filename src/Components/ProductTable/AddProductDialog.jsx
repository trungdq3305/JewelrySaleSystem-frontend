import { useState } from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, FormControlLabel, Checkbox, MenuItem, Select, FormControl, InputLabel, Button, Paper } from '@mui/material'

const AddProductDialog = ({ openDialog, handleCloseDialog, onAddProduct, initialFormData }) => {
  const [formData, setFormData] = useState(initialFormData)
  const [propChecks, setPropChecks] = useState({
    additionalProp1: false,
    additionalProp2: false,
    additionalProp3: false
  })
  const handleChange = (event) => {
    const { name, value } = event.target
    const [mainKey, subKey] = name.split('.')

    const isNumericField = ['machiningCost', 'amount', 'gem.additionalProp2', 'gem.additionalProp3'].includes(name)
    const isDecimalField = ['weight', 'size', 'markupRate'].includes(name)

    if (isNumericField && value !== '' && isNaN(value)) {
      return
    }

    if (isDecimalField && value !== '' && isNaN(parseFloat(value))) {
      return
    }

    const parsedValue = isNumericField ? parseInt(value, 10) : isDecimalField ? parseFloat(value) : value

    if (subKey) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [mainKey]: {
          ...prevFormData[mainKey],
          [subKey]: parsedValue
        }
      }))
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: parsedValue
      }))
    }
  }

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target
    setPropChecks((prevChecks) => ({
      ...prevChecks,
      [name]: checked
    }))

    setFormData((prevFormData) => ({
      ...prevFormData,
      gem: {
        ...prevFormData.gem,
        [name]: checked ? '' : 0
      }
    }))
  }
  const handleAddProduct = () => {
    onAddProduct(formData)
    setFormData(initialFormData) // Reset the form
    setPropChecks({
      additionalProp1: false,
      additionalProp2: false,
      additionalProp3: false
    })
  }
  return (
    <Dialog open={openDialog} onClose={handleCloseDialog}>
      <DialogTitle>Add Product</DialogTitle>
      <DialogContent>
        <Paper variant="outlined" component="form" sx={{ margin: 2, padding: 2 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="productName"
            label="Product Name"
            value={formData.productName}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <MenuItem value="day chuyen">Day Chuyen</MenuItem>
              <MenuItem value="lac chan">Lac Chan</MenuItem>
              <MenuItem value="nhan">Nhan</MenuItem>
              <MenuItem value="charm">Charm</MenuItem>
              <MenuItem value="mat day chuyen">Mat Day Chuyen</MenuItem>
              <MenuItem value="vong tay">Vong Tay</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="normal"
            required
            fullWidth
            name="material"
            label="Material"
            type="number"
            value={formData.material}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="weight"
            label="Weight"
            type="text"
            value={formData.weight}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="machiningCost"
            label="Machining Cost"
            type="number"
            value={formData.machiningCost}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="size"
            label="Size"
            type="text"
            value={formData.size}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="amount"
            label="Amount"
            type="number"
            value={formData.amount}
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
            name="image"
            label="Image"
            value={formData.image}
            onChange={handleChange}
          />

          <FormControlLabel
            control={
              <Checkbox
                name="additionalProp1"
                checked={propChecks.additionalProp1}
                onChange={handleCheckboxChange}
              />
            }
            label="Additional Prop 1"
          />
          <TextField
            margin="normal"
            fullWidth
            name="gem.additionalProp1"
            label="Additional Prop 1"
            type="number"
            value={formData.gem.additionalProp1}
            onChange={handleChange}
            disabled={!propChecks.additionalProp1}
          />

          <FormControlLabel
            control={
              <Checkbox
                name="additionalProp2"
                checked={propChecks.additionalProp2}
                onChange={handleCheckboxChange}
              />
            }
            label="Additional Prop 2"
          />
          <TextField
            margin="normal"
            fullWidth
            name="gem.additionalProp2"
            label="Additional Prop 2"
            type="number"
            value={formData.gem.additionalProp2}
            onChange={handleChange}
            disabled={!propChecks.additionalProp2}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="additionalProp3"
                checked={propChecks.additionalProp3}
                onChange={handleCheckboxChange}
              />
            }
            label="Additional Prop 3"
          />
          <TextField
            margin="normal"
            fullWidth
            name="gem.additionalProp3"
            label="Additional Prop 3"
            type="number"
            value={formData.gem.additionalProp3}
            onChange={handleChange}
            disabled={!propChecks.additionalProp3}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="markupRate"
            label="Markup Rate"
            type="text"
            value={formData.markupRate}
            onChange={handleChange}
          />
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Cancel</Button>
        <Button onClick={handleAddProduct} variant="contained" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}
export default AddProductDialog