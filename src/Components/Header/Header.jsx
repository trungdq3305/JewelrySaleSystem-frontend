import styles from '../Header/Header.module.scss'
import React from 'react'
import logo from '../../assets/logo.jpg'

const Header = () => {
  return (
    <div className={styles.nav}>
      <div className={styles.logo}>
        <img src={logo}></img>
      </div>
      <div className={styles.navbar}>
        <ul>
          <li>
            <a href="">PRODUCT</a>
          </li>
          <li>
            <a href="">GOLD RATE</a>
          </li>
          <li>
            <a href="">DISCOUNT</a>
          </li>
          <li>
            <a href="">CUSTOMER</a>
          </li>
          <li>
            <a href="">HISTORY</a>
          </li>
          <li>
            <a href="">POLICY</a>
          </li>
          <li>
            <a href="">PROFILE</a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Header
