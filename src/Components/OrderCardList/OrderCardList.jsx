import React from 'react'
import OrderCard from '../OrderCard/OrderCard'

const OrderCardList = ({ cardValues }) => {
  return (
    <>
      {cardValues !== null ? (
        cardValues.map((cardValue) => {
          return (
            <OrderCard
              key={cardValue.productId}
              id={cardValue.productId}
              name={cardValue.productName}
              price={cardValue.price}
              priceWithDiscount={cardValue.priceWithDiscount}
              
            />
          )
        })
      ) : (
        <div>Empty</div>
      )}
    </>
  )
}

export default OrderCardList
