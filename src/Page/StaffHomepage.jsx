import React, { useEffect, useState } from 'react'
import Header from '../Components/Header/Header'
import Sidebar from '../Components/Sidebar/Sidebar'
import { getAllGem, getAllProducts } from '../Configs/axios'
import ProductItem from '../Components/ProductItem/ProductItem'
import ProductList from '../Components/ProductList/ProductList'
import Order from '../Components/Order/Order'
import style from '../Page/Scss/StaffHomepage.module.scss'
const StaffHomepage = () => {
  const [materials, setMaterials] = useState(null)
  const [gems, setGems] = useState(null)
  const [products, setProducts] = useState(null)

  const loadmaterials = async () => {}
  const loadGem = async () => {
    const result = await getAllGem()

    if (Array.isArray(result)) {
      setGems(result)
    }
    console.log(result)
  }

  const loadProducts = async () => {
    const result = await getAllProducts()

    setProducts(result.data)

    console.log(result.data)
  }
  useEffect(() => {
    loadmaterials()
  }, [])
  useEffect(() => {
    loadGem()
  }, [])

  useEffect(() => {
    loadProducts()
  }, [])
  return (
    <>
      <div className={style.container}>
        <Header></Header>
        <div className={style.body}>
          <Sidebar materials={materials} gems={gems} />
          <ProductList products={products} />
          {console.log(products)}
          <Order></Order>
        </div>
      </div>
    </>
  )
}

export default StaffHomepage
