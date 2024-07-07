
import React, { useEffect, useState } from 'react'
import BillProduct from '../Components/BillProduct/BillProduct'
import styles from '../Page/Scss/Billpage.module.scss'
import Header from '../Components/Header/Header'
import BillInfor from '../Components/BillInfor/BillInfor'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import CustomerList from '../Components/CustomerList/CustomerList'

const BillPage = () => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [billProduct, setBillProduct] = useState([])
  const [totalCost, setTotalCost] = useState(0)

  const loadBillProduct = () => {
    const productList = sessionStorage.getItem('cardValues')
    if (productList != null) {
      setBillProduct(JSON.parse(productList))
    }

    console.log(JSON.parse(productList))
  }
  const calculateCost = () => {
    const cost = billProduct.reduce(
      (total, card) => total + card.PriceWithDiscount * card.Quantity,
      0
    )
    setTotalCost(cost)
  }
  useEffect(() => {
    loadBillProduct()
    calculateCost()
  }, [calculateCost])

  return (
    <>
      <div className={styles.container}>
        <Header />

        <div className={styles.bodyContainer}>
          <div className={styles.title}>
            <h2>Bill Summary</h2>
          </div>
          <div className={styles.body}>
            <BillInfor handleOpen={handleOpen} />
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <CustomerList />
              </Box>
            </Modal>
            <BillProduct products={billProduct} totalCost={totalCost} VND />
          </div>
        </div>
      </div>
    </>
  )

}

export default BillPage
