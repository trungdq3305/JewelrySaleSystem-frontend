import { useEffect, useState } from 'react'
import { Box, Button, Paper, TextField } from '@mui/material'
import ManagerSideBar from '../Components/Sidebar/ManagerSideBar'
import ProductTable from '../Components/ProductTable/ProductTable'
import { getAllProducts, addProduct, searchProduct } from '../Configs/axios'
import AddProductDialog from '../Components/ProductTable/AddProductDialog'
const ManagerHomePage = () => {
  const [products, setProducts] = useState(null)
  const [loading, setLoading] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const handleOpenDialog = () => {
    setOpenDialog(true)
  }
  const handleCloseDialog = () => {
    setOpenDialog(false)
  }
  const initialFormData = {
    productName: '',
    category: '',
    material: '',
    weight: '',
    machiningCost: '',
    size: '',
    amount: '',
    desc: '',
    image: '',
    gem: {
      additionalProp1: 0,
      additionalProp2: 0,
      additionalProp3: 0,
    },
    markupRate: '',
  }
  const onSearchTextChange = async (event) => {
    const searchValue = event.target.value
    if (searchValue.length == 0) {
      const result = await getAllProducts()
      setProducts(result.data)
      return
    }
    const result = await searchProduct(searchValue)
    console.log(result)
    setProducts(result.data.data)
  }
  const loadProducts = async () => {
    const result = await getAllProducts('', '', '', '')
    setProducts(result.data.data)
    console.log(products)
    setLoading(true)
  }
  const handleAddProduct = async (formData) => {
    const requiredFields = [
      'productName',
      'category',
      'material',
      'weight',
      'machiningCost',
      'size',
      'amount',
      'desc',
      'image',
    ]
    const isAnyFieldEmpty = requiredFields.some((field) => !formData[field])

    if (isAnyFieldEmpty) {
      window.alert('Please fill out all required fields.')
      return
    }

    try {
      const result = await addProduct(formData)
      console.log(result.data)
      // Close the dialog
      handleCloseDialog()
      loadProducts()
    } catch (error) {
      console.error('Error adding product:', error)
      // Handle error state or display error message to user
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])
  if (!loading) return <div>loading....</div>
  console.log(products)

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
        <ManagerSideBar />
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            padding: '20px',
          }}
        >
          <Paper
            sx={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              maxHeight: '80vh',
              overflow: 'hidden',
              padding: '10px',
            }}
          >
            <Button
              sx={{ alignSelf: 'flex-start', marginBottom: '10px' }}
              onClick={handleOpenDialog}
            >
              Add Product
            </Button>
            <TextField
              id="filled-search"
              label="Search"
              type="search"
              variant="filled"
              style={{ width: '300px' }}
              onChange={onSearchTextChange}
            />
            <AddProductDialog
              openDialog={openDialog}
              handleCloseDialog={handleCloseDialog}
              onAddProduct={handleAddProduct}
              initialFormData={initialFormData}
            />
            <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
              <ProductTable products={products} />
            </Box>
          </Paper>
        </Box>
      </Box>
    </>
  )
}

export default ManagerHomePage
