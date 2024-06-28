import axios from 'axios'

const api = 'https://localhost:7093/api'
export const getAllProducts = (productId, productName, Category, Material) => {
  try {
    const query = `?ProductId=${productId}&ProductName=${productName}&Category=${Category}&Material=${Material}`
    const data = axios.get(api + '/products/view-product' + query)
    console.log(data)
    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error massage: ', error.message)
      return error.message
    } else {
      console.log('Unexpected error: ', error)
      return 'An unexpected error has occired'
    }
  }
}

export const getAllGem = async () => {
  try {
    const data = await axios.get(api + '/gem')
    console.log(data.data)
    return data.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error massage: ', error.message)
      return error.message
    } else {
      console.log('Unexpected error: ', error)
      return 'An unexpected error has occired'
    }
  }
}
export const addProduct = async (formData) => {
  try {
    const data = await axios.post(api + '/products/create-product', formData)
    console.log(data)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error massage: ', error.message)
      return error.message
    } else {
      console.log('Unexpected error: ', error)
      return 'An unexpected error has occired'
    }
  }
}
export const searchProduct = async (searchValue) => {
  try {
    const data = await axios.get(
      api + `/products/productid?productId=${searchValue}`
    )
    console.log(data)
    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message)
      return error.message
    } else {
      console.log('Unxpected error:', error)
      return 'An unexpected error has occured'
    }
  }
}
export const editProduct = async () => {
  try {
    const data = await axios.put(api + '/products/product-update')
    console.log(data)
    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message)
      return error.message
    } else {
      console.log('Unxpected error:', error)
      return 'An unexpected error has occured'
    }
  }
}

export const getAllVouchers = async (voucherId, createdBy, expiredDay, publishedDay, cost, customerCustomerId) => {
  try {
    const data = await axios.get(api + '/voucher/viewlistvoucher')
    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error massage: ', error.message)
      return error.message
    } else {
      console.log('Unexpected error: ', error)
      return 'An unexpected error has occired'
    }
  }
}