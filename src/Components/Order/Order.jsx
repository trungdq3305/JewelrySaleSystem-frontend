import React from 'react'
import styles from '../Order/Order.module.scss'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
const Order = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.customer}></div>
        <hr></hr>
        <div className={styles.card}></div>
        <div className={styles.cost}></div>
      </div>
    </>
  )
}

export default Order
