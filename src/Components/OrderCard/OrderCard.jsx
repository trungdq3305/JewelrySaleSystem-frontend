import React, { useEffect, useState } from 'react'
import image from '../../assets/earing.jpg'
import styles from '../OrderCard/OrderCard.module.scss'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput'

import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { Minimize } from '@mui/icons-material'

const OrderCard = ({ name, price, priceWithDiscount }) => {
  const [value, setValue] = useState(1)
  const min = 0
  const max = 10
  return (
    <>
      <Box
        className={styles.cardContainer}
        sx={{ boxShadow: 3, borderRadius: 2 }}
      >
        <div className={styles.cardImage}>
          <img src={image}></img>
        </div>

        <div className={styles.cardContent}>
          <p style={{ fontWeight: 500 }}>{name}</p>
          {price === priceWithDiscount ? (
            <p style={{ fontWeight: 300, padding: 4 }}>
              {' '}
              {Number(price * value).toLocaleString('en')}VND
            </p>
          ) : (
            <>
              <p
                style={{
                  fontWeight: 300,
                  padding: 4,
                  textDecoration: 'line-through',
                }}
              >
                {Number(price * value).toLocaleString('en')}VND
              </p>
              <p style={{ fontWeight: 300, padding: 4 }}>
                {Number(priceWithDiscount * value).toLocaleString('en')}VND
              </p>
            </>
          )}

          <form>
            <div className={styles.iconContainer}>
              <TextField
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="standard"
                value={value}
                onChange={(e) => {
                  var value = parseInt(e.target.value, 10)

                  if (value > max) value = max
                  if (value < min) value = min

                  setValue(value)
                }}
              />
            </div>
          </form>
        </div>
      </Box>
    </>
  )
}
export default OrderCard
