import styles from '../Header/Header.module.scss'
import React from 'react'
import logo from '../../assets/logo.jpg'
import CustomizedMenus from '../React-menu/ReactMenu'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'

const Header = ({ handleCategory }) => {
  const navigate = useNavigate()
  const handleNavigateToManageCustomer = () => {
    navigate('/StaffPage/StaffCustomer')
  }
  return (
    <div className={styles.nav}>
      <div className={styles.logo}>
        <img src={logo} alt="Logo" />
      </div>
      <div className={styles.navbar}>
        <ul>
          <li>
            <button
              onClick={() => {
                navigate('/StaffPage')
              }}
            >
              <CustomizedMenus handleCategory={handleCategory} />
            </button>
          </li>
          <li>
            <Button
              sx={{
                backgroundColor: '#333',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#ffdbf0',
                  color: 'black',
                },
              }}
            >
              GOLD RATE
            </Button>
          </li>

          <li>
            <Button
              sx={{
                backgroundColor: '#333',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#ffdbf0',
                  color: 'black',
                },
              }}
            >
              DISCOUNT
            </Button>
          </li>
          <li>
          <Button
              onClick={handleNavigateToManageCustomer}
              sx={{
                backgroundColor: '#333',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#ffdbf0',
                  color: 'black',
                },
              }}
            >
              CUSTOMER
            </Button>
          </li>
          <li>
            <Button
              sx={{
                backgroundColor: '#333',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#ffdbf0',
                  color: 'black',
                },
              }}
            >
              HISTORY
            </Button>
          </li>
          <li>
            <Button
              sx={{
                backgroundColor: '#333',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#ffdbf0',
                  color: 'black',
                },
              }}
            >
              POLICY
            </Button>
          </li>
          <li>
            <Button
              sx={{
                backgroundColor: '#333',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#ffdbf0',
                  color: 'black',
                },
              }}
            >
              PROFILE{' '}
            </Button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Header
