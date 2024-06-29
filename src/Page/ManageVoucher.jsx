import { useEffect, useState } from 'react';
import { Box, Button, Paper, TextField } from '@mui/material';
import VoucherTable from '../Components/VoucherTable/VoucherTable';
import { getAllVouchers, addVoucher } from '../Configs/axios';
import AddVoucherDialog from '../Components/VoucherTable/AddVoucherDialog';

const ManageVoucher = () => {
  const [vouchers, setVouchers] = useState([])
  const [loading, setLoading] = useState(true)
  const [openDialog, setOpenDialog] = useState(false)

  const handleOpenDialog = () => {
    setOpenDialog(true)
  };

  const handleCloseDialog = () => {
    setOpenDialog(false)
  };

  const initialFormData = {
    expiredDay: {
    year: '',
    month: '',
    day: ''
  },
  publishedDay: {
    year: '',
    month: '',
    day: ''
  },
  cost: 0,
  customerCustomerId: ''
  };

  const onSearchTextChange = async (event) => {
    const searchValue = event.target.value;
    if (searchValue.length === 0) {
      loadVouchers();
    } else {
      const result = await searchVoucher(searchValue);
      setVouchers(result.data.data);
    }
  };

  const loadVouchers = async () => {
    setLoading(true)
    console.log('hello')
    const result = await getAllVouchers('', '', '', '', '', '');
    console.log(result.data)
    setVouchers(result.data);
    setLoading(false)
    console.log()
  };

  const handleAddVoucher = async (formData) => {
    const requiredFields = [
      'expiredDay',
      'publishedDay',
      'customerCustomerId'
    ]
    const isAnyFieldEmpty = requiredFields.some((field) => !formData[field]);

    if (isAnyFieldEmpty) {
      window.alert('Please fill out all required fields.');
      return
    }

    try {
      await addVoucher(formData);
      handleCloseDialog();
      loadVouchers();
      console.log(formData)
    } catch (error) {
      console.error('Error adding voucher:', error)
      // Handle error state or display error message to user
    }
  };

  

  useEffect(() => {
    loadVouchers();
  }, []);

  if (loading) return <div>Loading....</div>;

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: '20px',
        }}
      >
        <Paper
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            maxHeight: '80vh',
            overflow: 'hidden',
            padding: '10px'
          }}
        >
          <Button
            sx={{ alignSelf: 'flex-start', marginBottom: '10px' }}
            onClick={handleOpenDialog}
          >
            Add Voucher
          </Button>
          <TextField
            id="filled-search"
            label="Search"
            type="search"
            variant="filled"
            style={{ width: '300px' }}
            onChange={onSearchTextChange}
          />
          <AddVoucherDialog
            openDialog={openDialog}
            handleCloseDialog={handleCloseDialog}
            onAddVoucher={handleAddVoucher}
            initialFormData={initialFormData}
          />
          <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
            <VoucherTable vouchers ={ vouchers.data } />
          </Box>
        </Paper>
      </Box>
    </>
  )
}

export default ManageVoucher