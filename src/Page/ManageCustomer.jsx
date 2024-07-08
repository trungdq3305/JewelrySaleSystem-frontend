import { useEffect, useState } from 'react';
import { Box, Button, Paper } from '@mui/material';
import CustomerTable from '../Components/CustomerTable/CustomerTable';
import { getAllCustomers, addCustomer } from '../Configs/axios';
import AddCustomerDialog from '../Components/CustomerTable/AddCustomerDialog';
import ManagerSideBar from '../Components/Sidebar/ManagerSideBar';

const ManageCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

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
            </Box>

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
