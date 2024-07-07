
import { useEffect, useState } from 'react';
import { Box, Button, Paper, TextField , Menu, MenuItem, IconButton } from '@mui/material';
import CustomerTable from '../Components/CustomerTable/CustomerTable';
import { getAllCustomers } from '../Configs/axios';
//import AddVoucherDialog from '../Components/VoucherTable/AddVoucherDialog';
import SearchIcon from '@mui/icons-material/Search';
import ManagerSideBar from '../Components/Sidebar/ManagerSideBar';

const ManageCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
//   const [searchCriteria, setSearchCriteria] = useState('expiredDay');
//   const [inputValue, setInputValue] = useState('');
//   const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

//   const initialSearchParams = {
//     expiredDay: {
//       Year: '',
//       Month: '',
//       Day: '',
//     },
//     customerId: '',
//     customerName: '',
//     customerPhone: '',
//     customerEmail: '',
//   };

//   const [searchParams, setSearchParams] = useState(initialSearchParams);

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     setLoading(true);
  
//     let transformedSearchParams = {};
  
    // Depending on the search criteria, set the appropriate fields in transformedSearchParams
    // switch (searchCriteria) {
    //   case 'expiredDay':
    //     transformedSearchParams = {
    //       ...searchParams,
    //       'expiredDay.Year': searchParams.expiredDay.Year,
    //       'expiredDay.Month': searchParams.expiredDay.Month,
    //       'expiredDay.Day': searchParams.expiredDay.Day,
    //     };
    //     delete transformedSearchParams.expiredDay; // Remove nested expiredDay object
    //     break;
    //   case 'customerId':
    //     transformedSearchParams = {
    //       ...searchParams,
    //       customerId: searchParams.customerId,
    //     };
    //     break;
    //   case 'customerName':
    //     transformedSearchParams = {
    //       ...searchParams,
    //       customerName: searchParams.customerName,
    //     };
    //     break;
    //   case 'customerPhone':
    //     transformedSearchParams = {
    //       ...searchParams,
    //       customerPhone: searchParams.customerPhone,
    //     };
    //     break;
    //   case 'customerEmail':
    //     transformedSearchParams = {
    //       ...searchParams,
    //       customerEmail: searchParams.customerEmail,
    //     };
    //     break;
    //   default:
    //     break;
    // }
  
//     try {
//       const vouchers = await getVouchers(transformedSearchParams);
//       console.log(transformedSearchParams);
//       console.log('Received vouchers:', vouchers);
//       setVouchers(vouchers);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

  const initialFormData = {
    fullName: '',
    doB: '',
    address: '',
    email: '',
    phone: '',
    point: '',
    rate: '',
    status: '',
  };

  const loadCustomers = async () => {
    setLoading(true);
    const result = await getAllCustomers();
    setCustomers(result.data);
    setLoading(false);
  };

//   const handleAddVoucher = async (formData) => {
//     try {
//       await addVoucher(formData);
//       handleCloseDialog();
//       loadVouchers();
//       console.log(formData);
//     } catch (error) {
//       console.error('Error adding voucher:', error);
//       // Handle error state or display error message to user
//     }
//   };

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      try {
        const params = {
            fullName: '',
            doB: '',
            address: '',
            email: '',
            phone: '',
            point: '',
            rate: '',
            status: '',
        };
        console.log(params);
        const customers = await getAllCustomers();
        console.log(customers)
        setCustomers(customers);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

//   useEffect(() => {
//     setSearchParams(initialSearchParams);
//   }, [searchCriteria]);

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
              padding: '10px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '10px',
              }}
            >
              {/* <Button onClick={handleOpenDialog}>Add Voucher</Button>
              <form onSubmit={handleSearch}>
                <label>Search By:</label>
                <select
                  value={searchCriteria}
                  onChange={(e) => setSearchCriteria(e.target.value)}
                >
                  <option value="expiredDay">Expired Day</option>
                  <option value="customerId">Customer ID</option>
                  <option value="customerName">Customer Name</option>
                  <option value="customerPhone">Customer Phone</option>
                  <option value="customerEmail">Customer Email</option>
                </select>
                <br />

                {searchCriteria === 'expiredDay' ? (
                  <div>
                    <label>Year:</label>
                    <input
                      type="number"
                      value={searchParams.expiredDay.Year}
                      onChange={(e) =>
                        setSearchParams((prevParams) => ({
                          ...prevParams,
                          expiredDay: {
                            ...prevParams.expiredDay,
                            Year: e.target.value,
                          },
                        }))
                      }
                    />
                    <br />
                    <label>Month:</label>
                    <input
                      type="number"
                      value={searchParams.expiredDay.Month}
                      onChange={(e) =>
                        setSearchParams((prevParams) => ({
                          ...prevParams,
                          expiredDay: {
                            ...prevParams.expiredDay,
                            Month: e.target.value,
                          },
                        }))
                      }
                    />
                    <br />
                    <label>Day:</label>
                    <input
                      type="number"
                      value={searchParams.expiredDay.Day}
                      onChange={(e) =>
                        setSearchParams((prevParams) => ({
                          ...prevParams,
                          expiredDay: {
                            ...prevParams.expiredDay,
                            Day: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                ) : searchCriteria === 'customerId' ? (
                  <div>
                    <label>Customer ID:</label>
                    <input
                      type="text"
                      value={searchParams.customerId}
                      onChange={(e) =>
                        setSearchParams((prevParams) => ({
                          ...prevParams,
                          customerId: e.target.value,
                        }))
                      }
                    />
                  </div>
                ) : searchCriteria === 'customerName' ? (
                  <div>
                    <label>Customer Name:</label>
                    <input
                      type="text"
                      value={searchParams.customerName}
                      onChange={(e) =>
                        setSearchParams((prevParams) => ({
                          ...prevParams,
                          customerName: e.target.value,
                        }))
                      }
                    />
                  </div>
                ) : searchCriteria === 'customerPhone' ? (
                  <div>
                    <label>Customer Phone:</label>
                    <input
                      type="text"
                      value={searchParams.customerPhone}
                      onChange={(e) =>
                        setSearchParams((prevParams) => ({
                          ...prevParams,
                          customerPhone: e.target.value,
                        }))
                      }
                    />
                  </div>
                ) : searchCriteria === 'customerEmail' ? (
                  <div>
                    <label>Customer Email:</label>
                    <input
                      type="email"
                      value={searchParams.customerEmail}
                      onChange={(e) =>
                        setSearchParams((prevParams) => ({
                          ...prevParams,
                          customerEmail: e.target.value,
                        }))
                      }
                    />
                  </div>
                ) : null}
                <br />
                <button type="submit">Search</button>
              </form> */}
            </Box>

            {/* <AddVoucherDialog
              openDialog={openDialog}
              handleCloseDialog={handleCloseDialog}
              onAddVoucher={handleAddVoucher}
              initialFormData={initialFormData}
            /> */}
            <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
              <CustomerTable customers={customers.data} />
            </Box>
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default ManageCustomer;
