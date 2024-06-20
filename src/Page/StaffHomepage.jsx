import React, { useEffect, useState } from 'react'
import Header from '../Components/Header/Header'
import Sidebar from '../Components/Sidebar/Sidebar'
import { getAllGem, getAllProducts } from '../Configs/axios'
import Pagination from '@mui/material/Pagination'

import ProductList from '../Components/ProductList/ProductList'
import Order from '../Components/Order/Order'
import style from '../Page/Scss/StaffHomepage.module.scss'

const StaffHomepage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [cardsPerPage] = useState(8)
  const [products, setProducts] = useState([])
  const [cardValues, setCardValues] = useState([])
  const [totalCost, setTotalCost] = useState(0)

  const loadProducts = async () => {
    const result = await getAllProducts('', '', '', '')
    setProducts(result.data.data)
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const handleChange = (event, value) => {
    setCurrentPage(value)
  }

  const addProduct = async (e) => {
    e.preventDefault()
    const card = await getAllProducts(e.target[0].value, '', '', '')
    const newProduct = card.data.data[0]

    if (cardValues.find((value) => value.id === newProduct.id)) {
      return
    }

    const updatedCardValues = [...cardValues, newProduct]
    setCardValues(updatedCardValues)
    sessionStorage.setItem('cardValues', JSON.stringify(updatedCardValues))
  }

  const calculateCost = () => {
    const cost = cardValues.reduce(
      (total, card) => total + card.priceWithDiscount,
      0
    )
    setTotalCost(cost)
  }

  const handleCategory = (button) => {
    console.log(button)
    alert('OK')
  }

  useEffect(() => {
    loadProducts()
    const storedCardValues = sessionStorage.getItem('cardValues')
    if (storedCardValues) {
      setCardValues(JSON.parse(storedCardValues))
    }
  }, [])

  useEffect(() => {
    calculateCost()
  }, [cardValues])

  const indexOfLastCard = currentPage * cardsPerPage
  const indexOfFirstCard = indexOfLastCard - cardsPerPage
  const currentCards = products.slice(indexOfFirstCard, indexOfLastCard)

  return (
    <div className={style.container}>
      <Header handleButtonClick={handleCategory} />
      <div className={style.body}>
        <ProductList products={currentCards} addProduct={addProduct} />
        <Order cardValues={cardValues} totalCost={totalCost} />
      </div>
      <Pagination
        count={Math.ceil(products.length / cardsPerPage)}
        page={currentPage}
        onChange={handleChange}
      />
    </div>
  )
}

export default StaffHomepage
