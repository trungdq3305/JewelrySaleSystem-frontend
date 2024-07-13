import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import HomePage from '../assets/HomePage.png';

const ManagerPage = () => {
  const navigate = useNavigate();

  const handleManagerButton = () => navigate('/ManagerHomePage');
  const handleStaffButton = () => navigate('/StaffPage');
  const handleAdminButton = () => navigate('/AdminPage');

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
          body, html {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
          }
        `}
      </style>

      <div style={{
        backgroundImage: `url(${HomePage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'center',
        color: '#fff',
        textAlign: 'center',
        paddingRight: '20px',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: '1',
          marginRight: '10%'
        }}>
          <img src={logo} alt="Logo" style={{ maxWidth: '300px', maxHeight: '300px', marginBottom: '20px' }} />
          <h1 style={{ 
            marginTop: '10px', 
            fontFamily: 'Roboto, sans-serif', 
            color: '#daadaf', 
            fontSize: '2.5rem' // Adjust the font size as needed
          }}>
            Welcome Manager
          </h1>
          <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Button variant='outlined' onClick={handleManagerButton}
              sx={{
                backgroundColor: '#e39994',
                color: 'white',
                border: '1px solid #e39994',
                '&:hover': {
                  backgroundColor: '#e39994',
                  borderColor: 'white',
                },
              }}>
              Manager management
            </Button>
            <Button variant='outlined' onClick={handleStaffButton}
              sx={{
                backgroundColor: '#e39994',
                color: 'white',
                border: '1px solid #e39994',
                '&:hover': {
                  backgroundColor: '#e39994',
                  borderColor: 'white',
                },
              }}>
              Staff management
            </Button>
            <Button variant='outlined' onClick={handleAdminButton}
              sx={{
                backgroundColor: '#e39994',
                color: 'white',
                border: '1px solid #e39994',
                '&:hover': {
                  backgroundColor: '#e39994',
                  borderColor: 'white',
                },
              }}>
              Admin management
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ManagerPage;
