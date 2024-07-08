import React, { useEffect, useState } from 'react';
import { Box, Button, Paper, TextField, CircularProgress, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import GemTable from '../Components/ManageGem/GemTable';
import { getAllGem, addGem, getGems } from '../Configs/axios';
import ManagerSideBar from '../Components/Sidebar/ManagerSideBar';
import AddGemDialog from '../Components/ManageGem/AddGemDialog';

const ManageGem = () => {
  const [gems, setGems] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [openDialog, setOpenDialog] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState('gemId');
  const [inputValue, setInputValue] = useState('');

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    const transformedSearchParams = {
      [searchCriteria]: inputValue,
    };

    try {
      const response = await getGems(transformedSearchParams);
      console.log('Search response data:', response.data); 
      setGems(Array.isArray(response.data) ? response.data : []); 
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const initialFormData = {
    gemId: '',
    name: '',
    type: 0,
    price: 0,
    desc: '',
    rate: 0,
  };

  const loadGems = async () => {
    setLoading(true);
    try {
      const result = await getGems();
      console.log('Load gems data:', result.data); 
      setGems(Array.isArray(result.data) ? result.data : []);
    } catch (error) {
      console.error('Error loading gems:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNewGem = async (formData) => {
    try {
      await addGem(formData);
      handleCloseDialog();
      loadGems();
      console.log('New gem added successfully:', formData);
    } catch (error) {
      console.error('Error adding new gem:', error);
    }
  };

  useEffect(() => {
    loadGems();
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
      <ManagerSideBar />
      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        <Paper>
          <AddGemDialog
            openDialog={openDialog}
            handleCloseDialog={handleCloseDialog}
            onAddGem={handleAddNewGem}
            initialFormData={initialFormData}
          />
          <Box sx={{ p: 2 }}>
            <Button variant="contained" onClick={handleOpenDialog}>
              Add New Gem
            </Button>
            <FormControl fullWidth margin="normal">
              <InputLabel>Search By</InputLabel>
              <Select
                value={searchCriteria}
                onChange={(e) => setSearchCriteria(e.target.value)}
                label="Search By"
              >
                <MenuItem value="gemId">Gem ID</MenuItem>
                <MenuItem value="name">Name</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Search Gem"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              variant="outlined"
              margin="normal"
            />
            <Button variant="contained" onClick={handleSearch}>
              Search
            </Button>
          </Box>
          <GemTable gems={gems} reload={loadGems}/>
        </Paper>
      </Box>
    </Box>
  );
};

export default ManageGem;
