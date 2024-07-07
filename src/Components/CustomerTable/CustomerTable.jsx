import { useEffect, useState } from 'react'
import React from 'react'
import { useTheme } from '@mui/material/styles'
import PropTypes from 'prop-types'
//import EditVoucherDialog from './EditVoucherDialog'
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
  Alert,Dialog, DialogTitle, DialogContent, DialogActions,
} from '@mui/material'
import IconButton from '@mui/material/IconButton'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import LastPageIcon from '@mui/icons-material/LastPage'
//import { deleteVoucher, editVoucher } from '../../Configs/axios'
//import CustomerInfoDialog from './CustomerInfoDialog'

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
    status: '',
  }

//   const initialSearchFormData = {
//     customerId: '',
//     customerName: '',
//     customerPhone: '',
//     customerEmail: '',
//     expiredDay: '',
//     expiredMonth: '',
//     expiredYear: '',
//   };
  const CustomerTable = ({ customers }) => {
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [openDialog, setOpenDialog] = useState(false)
    const [editData, setEditData] = useState(initialFormData)
    const [openCustomerInfoDialog, setOpenCustomerInfoDialog] = useState(false);
    const [customerInfo, setCustomerInfo] = useState({});
    const [deleteSuccess, setDeleteSuccess] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
//     const [searchFormData, setSearchFormData] = useState(initialSearchFormData);
//    const [searchResults, setSearchResults] = useState([]);
//    const handleShowCustomerInfo = (voucher) => {
//     setCustomerInfo(voucher.customerCustomer);
//     setOpenCustomerInfoDialog(true);
//   };

//   const handleCloseCustomerInfoDialog = () => {
//     setOpenCustomerInfoDialog(false);
//   };
//     const handleEdit = (voucher) => {
//       handleOpenDialog()
  
//       setEditData({
//         ...initialFormData,
//         ...voucher,
//       })
//     }
    const handleOpenDialog = () => {
      setOpenDialog(true)
    }
    const handleCloseDialog = () => {
      setOpenDialog(false)
    }
    
    
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - customers.length) : 0
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage)
    }
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10))
      setPage(0)
    }
    // const handleDelete = async (voucherId) => {
    //   try {
    //     await deleteVoucher(voucherId);
    //     setDeleteSuccess(true);
    //     setOpenSnackbar(true);
    //     console.log(`Voucher ${voucherId} deleted successfully`);
    //   } catch (error) {
    //     setDeleteSuccess(false);
    //     setOpenSnackbar(true);
    //     console.error('Error deleting voucher:', error);
    //   } finally {
    //     setPage(0); // Reset the page to 0
    //     setRowsPerPage(5); // Reset the rows per page to 5
    //   }
    // };
    const handleCloseSnackbar = () => {
      setOpenSnackbar(false);
    };
    // const handleEditVoucher = async (formData) => { 
    //   const requiredFields = [
    //     'createdBy',
    //     'expiredDay',
    //     'publishedDay',
    //     'cost',
    //     'customerCustomerId'
    //   ]
    //   const isAnyFieldEmpty = requiredFields.some((field) => formData[field])
    //   console.log(isAnyFieldEmpty)
    //   console.log(formData)
    //   // if (isAnyFieldEmpty) {
    //   //   window.alert('Please fill out all required fields.')
    //   //   return
    //   // }
    //   try {
    //     const result = await editVoucher(formData)
    //     console.log(result)
    //     // Close the dialog
    //     handleCloseDialog()
    //   } catch (error) {
    //     console.error('Error editing voucher:', error)
    //     // Handle error state or display error message to user
    //   }
    // }
  
    // const reformatData = (formData) => {
    //   const item = materialMapping.find(item => item.label === formData.material);
    //   const value = item ? item.value : null;
    //   return {
    //     ...formData,
    //     material: value
    //   }
    // }
    


    const customerList = Array.isArray(customers) ? customers : []
    
  
    return (
      <>
      {/* <EditVoucherDialog
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        onEditVoucher={handleEditVoucher}
        formData={editData}
        setFormData={setEditData}
      /> */}
      <Snackbar
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        {/* <Alert
          severity={deleteSuccess? 'uccess' : 'error'}
          sx={{ width: '100%' }}
        >
          {deleteSuccess? 'Voucher deleted successfully!' : 'Error deleting voucher.'}
        </Alert> */}
      </Snackbar>
        <TableContainer
          component={Paper}
          sx={{ maxHeight: 440, display: 'flex', flexDirection: 'column' }}
        >
          <Table stickyHeader aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="right">fullName</TableCell>
                <TableCell align="right">doB</TableCell>
                <TableCell align="right">address</TableCell>
                <TableCell align="right">email</TableCell>
                <TableCell align="right">phone</TableCell>
                <TableCell align="right">point</TableCell>
                <TableCell align="right">rate</TableCell>
                <TableCell align="right">status</TableCell>
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
                    {customer.status}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {/* <Button onClick={() => handleEdit(voucher)}>Edit</Button>
                    <Button onClick={() => handleShowCustomerInfo(voucher)}>Customer Info</Button>
                    <Button onClick={() => handleDelete(voucher.voucherId)}>Delete</Button> */}
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
                  slotProps={{
                    select: {
                      inputProps: {
                        'aria-label': 'rows per page',
                      },
                      native: true,
                    },
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
        {/* <CustomerInfoDialog
        open={openCustomerInfoDialog}
        onClose={handleCloseCustomerInfoDialog}
        customerInfo={customerInfo}
      /> */}
      
      </>
    )
  }
  CustomerTable.propTypes = {
    customers: PropTypes.array.isRequired,
  }
  
  export default CustomerTable