import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
  TablePagination,
  Snackbar,
} from '@mui/material';

const initialFormData = {
  gemId: '',
  Name: '',
  Type: 0,
  Price: 0,
  Desc: '',
  rate: 0,
};

const GemTable = ({ gems }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [editData, setEditData] = useState(initialFormData);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleUpdateGem = (gem) => {
    setEditData(gem);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditData(initialFormData);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditGem = async (formData) => {
    console.log('Editing gem:', formData);
    handleCloseDialog();
  };

  const gemList = Array.isArray(gems) ? gems : [];

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, gemList.length - page * rowsPerPage);

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
        message="Gem updated successfully!"
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
            {gemList
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((gem) => (
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
      />
    </>
  );
};


export default GemTable;