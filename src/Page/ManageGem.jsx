import { useEffect, useState } from 'react';
import { Box, Button, Paper, TextField } from '@mui/material';
import GemTable from '../Components/ManageGem/GemTable';
import { getAllGem, addGem, getGems } from '../Configs/axios';
import ManagerSideBar from '../Components/Sidebar/ManagerSideBar';
import AddGemDialog from '../Components/ManageGem/AddGemDialog';

const ManageGem = () => {
  const [gems, setGems] = useState({ data: [] });
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
    let transformedSearchParams = {
      [searchCriteria]: inputValue,
    };

    try {
      const response = await getGems(transformedSearchParams);
      setGems(response.data);
    } catch (error) {
      console.error(error);
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
    const result = await getAllGem();
    setGems(result.data);
    setLoading(false);
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

  if (loading) return <div>Loading....</div>;

  console.log('Current gems:', gems.data);

  return (
    <>
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
              <TextField
                fullWidth
                label="Search Value"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                variant="outlined"
                margin="normal"
              />
              <Button variant="contained" onClick={handleSearch}>
                Search
              </Button>
            </Box>
            <GemTable gems={gems.data} />
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default ManageGem;
