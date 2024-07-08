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
  const [searchCriteria, setSearchCriteria] = useState('name'); // Default search criteria
  const [searchValue, setSearchValue] = useState('');
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

  const handleSearch = async () => {
    setLoading(true);
    try {
      if (searchCriteria === 'name') {
        const result = await getCustomersByName(searchValue);
        setCustomers(result.data);
      } else if (searchCriteria === 'phone') {
        const result = await getCustomerByPhone(searchValue);
        setCustomers(result.data); // Ensure that the result returned is an array for use with CustomerTable component
      }
      setError(''); // Clear any previous error message
    } catch (error) {
      console.error(`Error fetching customers by ${searchCriteria}:`, error);
      setError(`Error fetching customers by ${searchCriteria}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
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
                  label="Search"
                  variant="outlined"
                  value={searchValue}
                  onChange={handleInputChange}
                />
                <select
                  value={searchCriteria}
                  onChange={(e) => setSearchCriteria(e.target.value)}
                  style={{ marginLeft: '10px' }}
                >
                  <option value="name">Name</option>
                  <option value="phone">Phone</option>
                </select>
                <Button onClick={handleSearch} sx={{ ml: 2 }}>
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
