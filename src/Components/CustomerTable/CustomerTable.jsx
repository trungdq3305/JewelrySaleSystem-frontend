import { useEffect, useState } from 'react'
import React from 'react'
import { useTheme } from '@mui/material/styles'
import PropTypes from 'prop-types'
import EditCustomerDialog from './EditCustomerDialog'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  TablePagination,
  Button,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'
import IconButton from '@mui/material/IconButton'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import LastPageIcon from '@mui/icons-material/LastPage'
import { editCustomer, updateCustomerStatus } from '../../Configs/axios'
import AddCustomerDialog from './AddCustomerDialog'

function TablePaginationActions(props) {
  const theme = useTheme()
  const { count, page, rowsPerPage, onPageChange } = props

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0)
  }

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1)
  }

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1)
  }

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  }

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  )
}
TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
}

const initialFormData = {
  fullName: '',
  doB: '',
  address: '',
  email: '',
  phone: '',
  point: '',
  rate: '',
}

const CustomerTable = ({ customers, reloadCustomers }) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [openDialog, setOpenDialog] = useState(false)
  const [editData, setEditData] = useState(initialFormData)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')

  const handleEdit = (customer) => {
    handleOpenDialog()

    const { doB, ...rest } = customer
    const [year, month, day] = doB.split('-').map((part) => parseInt(part, 10))
    setEditData({
      ...initialFormData,
      ...rest,
      doB: { year, month, day },
    })
  }

  const handleOpenDialog = () => {
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - customers.length) : 0

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false)
  }

  const handleEditCustomer = async (formData) => {
    try {
      const result = await editCustomer(formData)
      console.log(result)
      handleCloseDialog()
      reloadCustomers() // Call the function to reload customers
    } catch (error) {
      console.error('Error editing customer:', error)
    }
  }

  const handleChangeStatus = async (customerId) => {
    try {
      const result = await updateCustomerStatus(customerId)
      console.log(result)
      setSnackbarMessage('Status updated successfully!')
      setOpenSnackbar(true)
      reloadCustomers() // Reload customers after updating status
    } catch (error) {
      console.error('Error updating status:', error)
      setSnackbarMessage('Error updating status.')
      setOpenSnackbar(true)
    }
  }

  const customerList = Array.isArray(customers) ? customers : []

  return (
    <>
      <EditCustomerDialog
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        onEditCustomer={handleEditCustomer}
        formData={editData}
        setFormData={setEditData}
      />
      <Snackbar
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="info" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <TableContainer
        component={Paper}
        sx={{ maxHeight: 440, display: 'flex', flexDirection: 'column' }}
      >
        <Table stickyHeader aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Birth</TableCell>
              <TableCell align="right">Address</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right">Point</TableCell>
              <TableCell align="right">Rate</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ flex: '1 1 auto', overflowY: 'auto' }}>
            {(rowsPerPage > 0
              ? customerList.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : customerList
            ).map((customer) => (
              <TableRow key={customer.customerId}>
                <TableCell component="th" scope="row" style={{ width: 50 }}>
                  {customer.customerId}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {customer.fullName}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {customer.doB}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {customer.address}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {customer.email}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {customer.phone}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {customer.point}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {customer.rate}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {customer.status ? 'Active' : 'Inactive'}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  <Button onClick={() => handleEdit(customer)}>Edit</Button>
                  <Button
                    onClick={() => handleChangeStatus(customer.customerId)}
                  >
                    Change Status
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={11} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={11}
                count={customerList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  )
}
CustomerTable.propTypes = {
  customers: PropTypes.array.isRequired,
  reloadCustomers: PropTypes.func.isRequired,
}

export default CustomerTable
