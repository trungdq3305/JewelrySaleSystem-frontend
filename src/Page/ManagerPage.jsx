import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
const ManagerPage = () => {
  const navigate = useNavigate()
  const handleManagerButton = () => navigate('/ManagerHomePage')
  const handleStaffButton = () => navigate ('/StaffPage')
  const handleAdminButton = () => navigate('/AdminHomePage')
  return (
    <>
      <div>Manager Home page</div>
      <div> hello</div>
      <Button variant= 'outlined'onClick={handleManagerButton} >
        Manager management
      </Button>
      <Button variant= 'outlined' onClick={handleStaffButton}>
        Staff management
      </Button>
      <Button variant= 'outlined' onClick={handleAdminButton}>
        Admin management
      </Button>
    </>
  )
}

export default ManagerPage
