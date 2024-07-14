/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { addUser, getAllUsers, searchUser } from '../Configs/axios';
import UserTable from '../Components/UserTable/UserTable';
import AddUserDialog from '../Components/UserTable/AddUserDialog';

const AdminHomepage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  const onSearchTextChange = async (event) => {
    const searchValue = event.target.value;
    if (searchValue.length === 0) {
      loadAllUsers();
    } else {
      const result = await searchUser(searchValue);
      setUsers(result.data.data);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const initialFormData = {
    role: '',
    fullName: '',
    doB: '',
    phone: '',
    address: ''
  };

  const roleMapping = [
    { id: 1, label: 'Staff' },
    { id: 2, label: 'Manager' },
    { id: 3, label: 'Admin' }
  ];

  const loadAllUsers = async () => {
    setLoading(true);
    const result = await getAllUsers();
    setUsers(result.data.data);
    setLoading(false);
  };

  const handleAddUser = async (formData) => {
    try {
      const result = await addUser(formData);
      if (result.code === 400) {
        window.alert(result.message);
      } else {
        console.log(result.data);
        handleCloseDialog();
        loadAllUsers();
      }
    } catch (error) {
      window.alert(error);
      console.error('Error adding user:', error);
    }
  };

  useEffect(() => {
    loadAllUsers();
  }, []);

  if (loading) return <div>Loading....</div>;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        padding: '20px',
        backgroundColor: '#f8bbd0', // Pink background
        minHeight: '100vh'
      }}
    >
      <Typography variant="h3" align="center" gutterBottom style={{ fontWeight: 'bold' }}>
  Welcome admin
</Typography>
      <Paper
        sx={{
          padding: '20px',
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          borderRadius: '30px'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontWeight: 'bold'
          }}
        >
          <Button
            onClick={handleOpenDialog}
            sx={{
              backgroundColor: 'white',
              color: '#3baf80',
              border: '1px solid #3baf80',
              '&:hover': {
                backgroundColor: 'white',
                borderColor: '#3baf80'
              },
              height: '50px'
            }}
          >
            Add User
          </Button>
          <TextField
            id="filled-search"
            label="Search"
            type="search"
            variant="filled"
            style={{ width: '300px' }}
            onChange={onSearchTextChange}
          />
        </Box>
        <AddUserDialog
          openDialog={openDialog}
          handleCloseDialog={handleCloseDialog}
          onAddUser={handleAddUser}
          initialFormData={initialFormData}
          roleMapping={roleMapping}
        />
        <UserTable users={users} />
      </Paper>
    </Box>
  );
};

export default AdminHomepage;
