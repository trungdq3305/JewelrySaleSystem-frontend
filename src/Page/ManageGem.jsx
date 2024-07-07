import { useEffect, useState } from 'react';
import { Box, Button, Paper } from '@mui/material';
import GemTable from '../Components/ManageGem/GemTable';
import { getAllGem, addGem, getGems } from '../Configs/axios';
import AddGem from '../Components/ManageGem/AddGem';
import ManagerSideBar from '../Components/Sidebar/ManagerSideBar';

const ManageGem = () => {
  const [gems, setGems] = useState({ data: [] });
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState('gemId');
  const [inputValue, setInputValue] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const initialSearchParams = {
    gemId: '',
    Name: '',
  };

  const [searchParams, setSearchParams] = useState(initialSearchParams);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    let transformedSearchParams = {};
  
    switch (searchCriteria) {
      case 'gemId':
        transformedSearchParams = {
          ...searchParams,
          gemId: searchParams.gemId,
        };
        break;
      case 'Name':
        transformedSearchParams = {
          ...searchParams,
          gemName: searchParams.Name,
        };
        break;
      default:
        break;
    }
  
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
    Name: '',
    Type: '',
    Price: 0,
    Desc: '',
    rate: 0,
  };

  const loadGems = async () => {
    setLoading(true);
    const result = await getAllGem();
    setGems(result.data);
    setLoading(false);
  };
  

  const handleAddGem = async (formData) => {
    try {
      await addGem(formData);
      handleCloseDialog();
      loadGems();
      console.log(formData);
    } catch (error) {
      console.error('Error adding gem:', error);
    }
  };

  useEffect(() => {
    const fetchGems = async () => {
      setLoading(true);
      try {
        const params = {
          gemId: '',
          Name: '',
        };
        console.log(params);
        const gems = await getGems(params);
        setGems(gems);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchGems();
  }, []);

  useEffect(() => {
    setSearchParams(initialSearchParams);
  }, [searchCriteria]);

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
              <Button onClick={handleOpenDialog}>Add Gem</Button>
              <form onSubmit={handleSearch}>
                <label>Search By:</label>
                <select
                  value={searchCriteria}
                  onChange={(e) => setSearchCriteria(e.target.value)}
                >
                  <option value="gemId">Gem ID</option>
                  <option value="Name">Gem Name</option>
                </select>
                <br />
                {searchCriteria === 'gemId' ? (
                  <div>
                    <label>Gem ID:</label>
                    <input
                      type="text"
                      value={searchParams.gemId}
                      onChange={(e) =>
                        setSearchParams((prevParams) => ({
                          ...prevParams,
                          gemId: e.target.value,
                        }))
                      }
                    />
                  </div>
                ) : (
                  <div>
                    <label>Gem Name:</label>
                    <input
                      type="text"
                      value={searchParams.Name}
                      onChange={(e) =>
                        setSearchParams((prevParams) => ({
                          ...prevParams,
                          Name: e.target.value,
                        }))
                      }
                    />
                  </div>
                )}
                <br />
                <button type="submit">Search</button>
              </form>
            </Box>

            <AddGem
              openDialog={openDialog}
              handleCloseDialog={handleCloseDialog}
              onAddGem={handleAddGem}
              initialFormData={initialFormData}
            />
            <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
              <GemTable gems={gems.data} />
            </Box>
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default ManageGem;
