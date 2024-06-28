import { useEffect, useState } from 'react'
import React from 'react'
import { useTheme } from '@mui/material/styles'
import PropTypes from 'prop-types'
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
} from '@mui/material'
import IconButton from '@mui/material/IconButton'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import LastPageIcon from '@mui/icons-material/LastPage'

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
    voucherId: '',
    createdBy: '',
    expiredDay: '',
    publishedDay: '',
    cost: '',
    customerCustomerId: '',
  }

  const VoucherTable = ({ vouchers }) => {
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [openDialog, setOpenDialog] = useState(false)
    const [editData, setEditData] = useState(initialFormData)
    const handleEdit = (voucher) => {
      handleOpenDialog()
  
      setEditData({
        ...initialFormData,
        ...voucher,
      })
    }
    const handleOpenDialog = () => {
      setOpenDialog(true)
    }
    const handleCloseDialog = () => {
      setOpenDialog(false)
    }
  
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - vouchers.length) : 0
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage)
    }
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10))
      setPage(0)
    }

  
    const reformatData = (formData) => {
      const item = materialMapping.find(item => item.label === formData.material);
      const value = item ? item.value : null;
      return {
        ...formData,
        material: value
      }
    }
  

    const voucherList = Array.isArray(vouchers) ? vouchers : []
  
  
    return (
      <>

  
        <TableContainer
          component={Paper}
          sx={{ maxHeight: 440, display: 'flex', flexDirection: 'column' }}
        >
          <Table stickyHeader aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="right">Created By</TableCell>
                <TableCell align="right">Expired Day</TableCell>
                <TableCell align="right">Published Day</TableCell>
                <TableCell align="right">Cost</TableCell>
                <TableCell align="right">Customer Id</TableCell>
                <TableCell align="right">Options</TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ flex: '1 1 auto', overflowY: 'auto' }}>
              {(rowsPerPage > 0
                ? voucherList.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
                : voucherList
              ).map((voucher) => (
                <TableRow key={voucher.voucherId}>
                  <TableCell component="th" scope="row">
                    {voucher.voucherId}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {voucher.createdBy}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {voucher.expiredDay}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {voucher.publishedDay}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {voucher.cost}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {voucher.customerCustomerId}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    <Button onClick={() => handleEdit(voucher)}>Edit</Button>
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
                  count={voucherList.length}
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
      </>
    )
  }
  VoucherTable.propTypes = {
    vouchers: PropTypes.array.isRequired,
  }
  
  export default VoucherTable