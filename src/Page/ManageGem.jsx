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
  const [error, setError] = useState('');

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
      setError(''); // Clear any previous errors
    } catch (error) {
      console.error('Search error:', error);
      setError(`Error fetching gems by ${searchCriteria}. Please try again.`);
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
      const result = await getAllGem();
      console.log('Load gems data:', result.data); 
      setGems(Array.isArray(result.data) ? result.data : []);
      setError(''); // Clear any previous errors
    } catch (error) {
      console.error('Error loading gems:', error);
      setError('Error loading gems. Please try again.');
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
      setError('Error adding new gem. Please try again.');
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
        <Paper sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: '10px' }}>
          <AddGemDialog
            openDialog={openDialog}
            handleCloseDialog={handleCloseDialog}
            onAddGem={handleAddNewGem}
            initialFormData={initialFormData}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <Button variant="contained" onClick={handleOpenDialog} sx={{ height: '50px' , margin: '20px',backgroundColor: 'white',
                color: '#3baf80', 
                border: '1px solid #3baf80',
                '&:hover': {
                  backgroundColor: 'white',
                  borderColor: '#3baf80',
                },
                height:'50px'}}>
              Add New Gem
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Search By</InputLabel>
                <Select
                  value={searchCriteria}
                  onChange={(e) => setSearchCriteria(e.target.value)}
                  label="Search By" sx={{ height: '50px'}}
                >
                  <MenuItem value="gemId">Gem ID</MenuItem>
                  <MenuItem value="name">Name</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Search"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                variant="outlined"
                margin="normal"
                style={{  marginLeft: '10px' }}
              />
              <Button variant="contained" onClick={handleSearch} sx={{ ml: 2 , padding : '5px',background: 'white',color: '#2596be', 
                border: '1px solid #2596be',
                '&:hover': {
                  backgroundColor: 'white',
                  borderColor: '#2596be',
                },}}>
                Search
              </Button>
            </Box>
          </Box>

          {error && <Box sx={{ mb: 2, color: 'red' }}>{error}</Box>}

          <GemTable gems={gems} reload={loadGems}/>
        </Paper>
      </Box>
    </Box>
  );
};

export default ManageGem;
