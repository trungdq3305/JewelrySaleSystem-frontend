import React from 'react'
import styles from '../Order/Order.module.scss'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import Divider from '@mui/material/Divider'
import OrderCard from '../OrderCard/OrderCard'
import Button from '@mui/material/Button'
import OrderCardList from '../OrderCardList/OrderCardList'
import { useNavigate } from 'react-router-dom'
const Order = ({
  cardValues,
  totalCost,
  updateQuantity,
  increase,
  decrease,
}) => {
  const navigate = useNavigate()
  return (
    <>
      <div className={styles.container}>
        {/* <div className={styles.customer}>
          <div className={styles.customerIcon}>
            <PersonAddAltIcon sx={{ fontSize: 30 }} />
          </div>
          <div className={styles.customerInfor}>
            <p style={{ fontSize: '18px', margin: '3px', marginLeft: '0' }}>
              Customer
            </p>
            <p>Point:</p>
          </div>
        </div>
        <div className={styles.hr}></div> */}
        <div className={styles.card}>
          <OrderCardList
            cardValues={cardValues}
            updateQuantity={updateQuantity}
            increase={increase}
            decrease={decrease}
          />
        </div>
        <div className={styles.cost}>
          <div>
            <p
              style={{
                width: '20px',
              }}
            >
              Total
            </p>
            <p>{Number(totalCost).toLocaleString('en')}VND</p>
          </div>
          <Button
            onClick={() => {
              navigate('/BillPage')
            }}
            className={styles.button}
            variant="contained"
            sx={{
              background: '#ffdbf0',
              color: 'black',
              width: '95%',

              '&:hover': {
                cursor: 'pointer',
                background: '#ffdbf0',
              },
            }}
          >
            CHECK OUT
          </Button>
        </div>
      </div>
    </>
  )
}

export default Order
