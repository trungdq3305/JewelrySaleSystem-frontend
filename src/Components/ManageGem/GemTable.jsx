import { useEffect, useState } from 'react'
import React from 'react'
import { useTheme } from '@mui/material/styles'
import PropTypes from 'prop-types'
import UpdateGemDialog from './UpdateGemDialog';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  TablePagination,
  Snackbar,
} from '@mui/material';
import IconButton from '@mui/material/IconButton'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import LastPageIcon from '@mui/icons-material/LastPage'
import { updateGem } from '../../Configs/axios'
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
  gemId: '',
  Name: '',
  Type: 0,
  Price: 0,
  Desc: '',
  rate: 0,
};
const initialSearchFormData = {
  gemId: '',
  Name: '',
};

const GemTable = ({ gems }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [editData, setEditData] = useState(initialFormData);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleUpdateGem = (gem) => {
    handleOpenDialog();
    setEditData({
      ...initialFormData,
      ...gem,
    });
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const handleEditGem = async (formData) => {
    const requiredFields = ['Name', 'Type', 'Price', 'rate'];
    const isFormValid = requiredFields.every((field) => formData[field] !== '' && formData[field] !== undefined);

    if (!isFormValid) {
      setSnackbarMessage('Please fill in all required fields.');
      setOpenSnackbar(true);
      return;
    }

    try {
      const result = await onEditGem(formData);
      console.log(result);
      setSnackbarMessage('Gem updated successfully!');
      setOpenSnackbar(true);
      handleCloseDialog();
    } catch (error) {
      console.error('Error updating gem:', error);
      setSnackbarMessage('Error updating gem.');
      setOpenSnackbar(true);
    }
  };

  const gemList = Array.isArray(gems) && gems.length > 0 ? gems : [];

  const emptyRows = rowsPerPage > 0 ? Math.max(0, (1 + page) * rowsPerPage - gemList.length) : 0;

  const displayRows = rowsPerPage > 0 ? gemList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : gemList;

  return (
    <>
      <UpdateGemDialog
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        onEditGem={handleEditGem}
        formData={editData}
        setFormData={setEditData}
      />
      <Snackbar
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        autoHideDuration={6000}
        message={snackbarMessage}
      />
      <TableContainer component={Paper} sx={{ maxHeight: 440, display: 'flex', flexDirection: 'column' }}>
        <Table stickyHeader aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Desc</TableCell>
              <TableCell align="right">Rate</TableCell>
              <TableCell align="right">Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayRows.map((gem) => (
              <TableRow key={gem.gemId}>
                <TableCell>{gem.gemId}</TableCell>
                <TableCell align="right">{gem.name}</TableCell>
                <TableCell align="right">{gem.type}</TableCell>
                <TableCell align="right">{gem.price}</TableCell>
                <TableCell align="right">{gem.desc}</TableCell>
                <TableCell align="right">{gem.rate}</TableCell>
                <TableCell align="right">
                  <Button onClick={() => handleUpdateGem(gem)}>Edit</Button>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={7} />
              </TableRow>
            )}
            {gemList.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No gems found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
        component="div"
        count={gemList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
      />
    </>
  );
};

GemTable.propTypes = {
  gems: PropTypes.array.isRequired,
};

export default GemTable;
