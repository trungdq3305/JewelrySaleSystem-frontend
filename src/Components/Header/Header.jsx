import styles from '../Header/Header.module.scss'
import React from 'react'
import logo from '../../assets/logo.jpg'
import CustomizedMenus from '../React-menu/ReactMenu'
import Button from '@mui/material/Button'

const Header = ({ handleButtonClick }) => {
  const buttons = [
    'GOLD RATE',
    'DISCOUNT',
    'CUSTOMER',
    'HISTORY',
    'POLICY',
    'PROFILE',
    'LOGOUT',
  ]
  const handleClick = (button) => {
    handleButtonClick(button) // Pass the button value to the parent component
  }
  return (
    <div className={styles.nav}>
      <div className={styles.logo}>
        <img src={logo} alt="Logo" />
      </div>
      <div className={styles.navbar}>
        <ul>
          <li>
            <CustomizedMenus />
          </li>
          {buttons.map((button) => (
            <li key={button}>
              <Button
                id="demo-customized-button"
                onClick={() => handleClick(button)}
                sx={{
                  backgroundColor: '#333',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#ffdbf0',
                    color: 'black',
                  },
                }}
              >
                {button}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Header
