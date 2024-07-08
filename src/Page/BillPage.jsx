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
import { getCustomer, getVouchers } from '../Configs/axios'

const BillPage = () => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 750,
    maxHeight: '80vh', // maximum height for the modal
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflowY: 'auto',
  }
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [billProduct, setBillProduct] = useState([])
  const [totalCost, setTotalCost] = useState(0)
  const [customerList, setCustomerList] = useState([])
  const [customer, setCustomer] = useState()
  const [voucherList, setVoucherList] = useState([])
  const [voucher, setVoucher] = React.useState('')

  const handleChange = (event) => {
    setVoucher(event.target.value)
    console.log(event.target.value)
  }

  const loadCustomers = async () => {
    const result = await getCustomer()
    if (result !== null) {
      setCustomerList(result.data)
    }

    console.log(result.data)
  }

  const loadVouchers = async () => {
    try {
      const params = {
        expiredDay: {
          Year: '',
          Month: '',
          Day: '',
        },
        customerId: '',
        customerName: '',
        customerPhone: '',
        customerEmail: '',
      }
      console.log(params)
      const vouchers = await getVouchers(params)
      console.log(vouchers.data)
      setVoucherList(vouchers.data)
    } catch (error) {
      console.error(error)
    }
  }
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

  const addCustomer = (cus) => {
    setCustomer(cus)
    handleClose()
  }
  useEffect(() => {
    loadBillProduct()
    calculateCost()
    loadCustomers()
    loadVouchers()
  }, [])

  return (
    <>
      <div className={styles.container}>
        <Header />

        <div className={styles.bodyContainer}>
          <div className={styles.title}>
            <h2>Bill Summary</h2>
          </div>
          <div className={styles.body}>
            <BillInfor
              handleOpen={handleOpen}
              customer={customer}
              vouchers={voucherList}
              handleChange={handleChange}
            />
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <CustomerList
                  customerList={customerList}
                  addCustomer={addCustomer}
                />
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
