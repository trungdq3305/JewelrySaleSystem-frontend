import React from 'react'
import { Grid } from '@mui/material'
import ProductItem from '../ProductItem/ProductItem'
import styles from '../ProductList/ProductList.module.scss'

const ProductList = ({ products }) => {
  return (
    <>
      <Grid
        className={styles.container}
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',

          gap: 1,
        }}
      >
        {products !== null ? (
          products.map((product, index) => {
            return (
              <Grid key={index}>
                <ProductItem
                  id={product.productId}
                  name={product.productName}
                  price={product.machiningCost}
                ></ProductItem>
              </Grid>
            )
          })
        ) : (
          <></>
        )}
      </Grid>
    </>
  )
}

export default ProductList
