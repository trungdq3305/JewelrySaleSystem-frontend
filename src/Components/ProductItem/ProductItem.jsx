import React from 'react'
import productImage from '../../assets/earing.jpg'
import styles from '../ProductItem/ProductItem.module.scss'

const ProductItem = ({ id, name, price }) => {
  return (
    // <div> Hello</div>
    <>
      <div className={styles.item}>
        <img src={productImage} alt="product" />
        <div className={styles.desc}>
          <div className={styles.detail}>
            <h3>{name}</h3>
            <p>{Number(price).toLocaleString('en')}VND</p>
            <p>
              <a href="#">View Detail </a>
              <button>Add</button>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductItem
