import { useEffect, useState } from 'react';
import { Box, Button, Paper, TextField , Menu, MenuItem, IconButton} from '@mui/material';
import VoucherTable from '../Components/VoucherTable/VoucherTable';
import { getAllVouchers, addVoucher, getVouchersByExpiredDay} from '../Configs/axios';
import AddVoucherDialog from '../Components/VoucherTable/AddVoucherDialog';
import SearchIcon from '@mui/icons-material/Search';
const ManageVoucher = () => {
  const [vouchers, setVouchers] = useState([])
  const [loading, setLoading] = useState(true)
  const [openDialog, setOpenDialog] = useState(false)

  const [anchorEl, setAnchorEl] = useState(null);
  const [searchExpiredDay, setSearchExpiredDay] = useState({
    year: '',
    month: '',
    day: ''
  })
  const handleOpenDialog = () => {
    setOpenDialog(true)
  };

  const handleCloseDialog = () => {
    setOpenDialog(false)
  };

  const handleOpenSearchMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseSearchMenu = () => setAnchorEl(null);

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
  

  const loadVouchers = async () => {
    setLoading(true);
    const result = await getAllVouchers();
    setVouchers(result.data);
    setLoading(false);
  };

  const handleAddVoucher = async (formData) => {
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

  const handleSearchByExpiredDay = async () => {
    try {
      const result = await getVouchersByExpiredDay( year );
      console.log(result.data)
      setVouchers(result.data);
    } catch (error) {
      console.error('Error searching vouchers:', error)
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
          <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '10px'
          }}
        >
          <Button onClick={handleOpenDialog}>
            Add Voucher
          </Button>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                label="Year"
                value={searchExpiredDay.year}
                onChange={(e) => setSearchExpiredDay({...searchExpiredDay, year: e.target.value })}
                size="small"
              />
              <IconButton onClick={handleSearchByExpiredDay}>
                <SearchIcon />
              </IconButton>
            </Box>
        </Box>
        
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