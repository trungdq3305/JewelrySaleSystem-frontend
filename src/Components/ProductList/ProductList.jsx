import React from 'react'
import { Grid } from '@mui/material'
import ProductItem from '../ProductItem/ProductItem'
import styles from '../ProductList/ProductList.module.scss'

const ProductList = ({ products, addProduct }) => {
  return (
    <>
      <Grid
        className={styles.container}
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',

          gap: 1,
        }}
      >
        {products !== null ? (
          products.map((product) => {
            return (
              <Grid key={product.productName}>
                <ProductItem
                  priceWithDiscount={product.priceWithDiscount}
                  addProduct={addProduct}
                  id={product.productId}
                  name={product.productName}
                  price={product.price}
                ></ProductItem>
              </Grid>
            )
          })
        ) : (
          <div></div>
        )}
      </Grid>
    </>
  )
}

export default ProductList
