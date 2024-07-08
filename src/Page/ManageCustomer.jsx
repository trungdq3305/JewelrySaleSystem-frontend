// ManageCustomer.jsx
import React, { useEffect, useState } from 'react';
import { Box, Button, Paper, TextField } from '@mui/material';
import CustomerTable from '../Components/CustomerTable/CustomerTable';
import { getAllCustomers, addCustomer, getCustomersByName, getCustomerByPhone } from '../Configs/axios';
import AddCustomerDialog from '../Components/CustomerTable/AddCustomerDialog';
import ManagerSideBar from '../Components/Sidebar/ManagerSideBar';

const ManageCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchCustomerName, setSearchCustomerName] = useState('');
  const [searchPhone, setSearchPhone] = useState('');
  const [error, setError] = useState('');

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const initialFormData = {
    fullName: '',
    doB: {
      year: '',
      month: '',
      day: '',
    },
    address: '',
    email: '',
    phone: '',
    status: true,
  };

  const loadCustomers = async () => {
    setLoading(true);
    try {
      const result = await getAllCustomers();
      setCustomers(result.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCustomer = async (formData) => {
    try {
      await addCustomer(formData);
      handleCloseDialog();
      loadCustomers(); // Reload the customers after adding a new one
    } catch (error) {
      console.error('Error adding customer:', error);
      // Handle error state or display error message to user
    }
  };

  const handleSearchByName = async () => {
    setLoading(true);
    try {
      const result = await getCustomersByName(searchCustomerName);
      setCustomers(result.data);
    } catch (error) {
      console.error('Error fetching customers by name:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchByPhone = async () => {
    setLoading(true);
    try {
      const result = await getCustomerByPhone(searchPhone);
      setCustomers(result.data); // Đảm bảo kết quả được trả về là một mảng để sử dụng với CustomerTable component
      setError(''); // Xóa thông báo lỗi nếu trước đó có lỗi
    } catch (error) {
      console.error('Error fetching customer by phone:', error);
      setError('Error fetching customer by phone. Please try again.'); // Đặt thông báo lỗi
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setSearchCustomerName(e.target.value);
  };

  const handlePhoneInputChange = (e) => {
    setSearchPhone(e.target.value);
  };

  useEffect(() => {
    loadCustomers();
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
              <Button onClick={handleOpenDialog}>Add Customer</Button>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  label="Search by Name"
                  variant="outlined"
                  value={searchCustomerName}
                  onChange={handleInputChange}
                />
                <Button onClick={handleSearchByName} sx={{ ml: 2 }}>
                  Search
                </Button>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  label="Search by Phone"
                  variant="outlined"
                  value={searchPhone}
                  onChange={handlePhoneInputChange}
                />
                <Button onClick={handleSearchByPhone} sx={{ ml: 2 }}>
                  Search
                </Button>
              </Box>
            </Box>

            {error && (
              <Box sx={{ mb: 2, color: 'red' }}>
                {error}
              </Box>
            )}

            <AddCustomerDialog
              openDialog={openDialog}
              handleCloseDialog={handleCloseDialog}
              onAddCustomer={handleAddCustomer}
              initialFormData={initialFormData}
            />
            <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
              <CustomerTable customers={customers} reloadCustomers={loadCustomers} />
            </Box>
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default ManageCustomer;
