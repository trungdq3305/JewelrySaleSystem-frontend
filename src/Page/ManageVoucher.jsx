import { useEffect, useState } from 'react';
import { Box, Button, Paper, TextField , Menu, MenuItem, IconButton} from '@mui/material';
import VoucherTable from '../Components/VoucherTable/VoucherTable';
import { getAllVouchers, addVoucher, getVouchers} from '../Configs/axios';
import AddVoucherDialog from '../Components/VoucherTable/AddVoucherDialog';
import SearchIcon from '@mui/icons-material/Search';
import ManagerSideBar from '../Components/Sidebar/ManagerSideBar';
const ManageVoucher = () => {
  const [vouchers, setVouchers] = useState([])
  const [loading, setLoading] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)

  const [anchorEl, setAnchorEl] = useState(null);
  
  const handleOpenDialog = () => {
    setOpenDialog(true)
  };

  const handleCloseDialog = () => {
    setOpenDialog(false)
  };

  const [searchParams, setSearchParams] = useState({
    expiredDay: {
      Year: '',
      Month: '',
      Day: '',
    },
    customerId: '',
    customerName: '',
    customerPhone: '',
    customerEmail: '',
  });
  const handleSearch = async () => {
    setLoading(true);
    try {
      const vouchers = await getVouchers(searchParams);
      console.log(searchParams)
      console.log('Received vouchers:', vouchers);
      setVouchers(vouchers);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
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

  

  useEffect(() => {
    const fetchVouchers = async () => {
      setLoading(true);
      try {
        const params = {
          expiredDay: {
            Year: '',
            Month: '',
            Day: '',
          },
          customerId: '',
          customerName: '',
          customerPhone: '',
          customerEmail: '',
        };
        console.log(params)
        const vouchers = await getVouchers(params);
        setVouchers(vouchers);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchVouchers();
  }, []);

  if (loading) return <div>Loading....</div>;

  return (
    <>
    <Box sx={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
    <ManagerSideBar />
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
          <form>
           <label>Expired Day:</label>
          <div>
          <label>Year:</label>
          <input
            type="number"
            value={searchParams.expiredDay.Year}
            onChange={(e) =>
              setSearchParams((prevParams) => ({
                ...prevParams,
                expiredDay: { ...prevParams.expiredDay, Year: e.target.value },
              }))
            }
          />
          <label>Month:</label>
          <input
            type="number"
            value={searchParams.expiredDay.Month}
            onChange={(e) =>
              setSearchParams((prevParams) => ({
                ...prevParams,
                expiredDay: { ...prevParams.expiredDay, Month: e.target.value },
              }))
            }
          />
          <label>Day:</label>
          <input
            type="number"
            value={searchParams.expiredDay.Day}
            onChange={(e) =>
              setSearchParams((prevParams) => ({
                ...prevParams,
                expiredDay: { ...prevParams.expiredDay, Day: e.target.value },
              }))
            }
          />
        </div> 
        
        <br />
        <label>Customer ID:</label>
        <input
          type="text"
          value={searchParams.customerId}
          onChange={(e) =>
            setSearchParams((prevParams) => ({ ...prevParams, customerId: e.target.value }))
          }
        />
        <br />
        <label>Customer Name:</label>
        <input
          type="text"
          value={searchParams.customerName}
          onChange={(e) =>
            setSearchParams((prevParams) => ({ ...prevParams, customerName: e.target.value }))
          }
        />
        <br />
        <label>Customer Phone:</label>
        <input
          type="text"
          value={searchParams.customerPhone}
          onChange={(e) =>
            setSearchParams((prevParams) => ({ ...prevParams, customerPhone: e.target.value }))
          }
        />
        <br />
        <label>Customer Email:</label>
        <input
          type="email"
          value={searchParams.customerEmail}
          onChange={(e) =>
            setSearchParams((prevParams) => ({ ...prevParams, customerEmail: e.target.value }))
          }
        />
        <br />
        <button onClick={handleSearch}>
          Search
        </button>
      </form>
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
      </Box>
    </>
  )
}

export default ManageVoucher