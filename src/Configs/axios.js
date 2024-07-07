import axios from 'axios'

const api = 'https://localhost:7093/api'
export const getAllProducts = async (
  productId,
  productName,
  Category,
  Material
) => {
  try {
    // const query = `?ProductId=${productId}&ProductName=${productName}&Category=${Category}&Material=${Material}`
    // const data = await axios.get(api + '/products/view-product' + query)
    const data = await axios.get(api + '/products')
    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error massage: ', error.message)
      return error.message
    } else {
      console.log('Unexpected error: ', error)
      return 'An unexpected error has occured'
    }
  }
}

export const getAllProductsv2 = async (
  productId,
  productName,
  Category,
  Material
) => {
  try {
    const query = `?ProductId=${productId}&ProductName=${productName}&Category=${Category}&Material=${Material}`
    const data = await axios.get(api + '/products/view-product' + query)

    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error massage: ', error.message)
      return error.message
    } else {
      console.log('Unexpected error: ', error)
      return 'An unexpected error has occured'
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
export const editProduct = async (formData) => {
  try {
    const data = await axios.put(api + '/products/productidupdate', formData)
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

export const getAllVouchers = async () => {
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

export const addVoucher = async (formData) => {
  try {
    const data = await axios.post(api + '/voucher/createvoucher', formData)
    console.log(data)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error massage: ', error.message)
      alert('PLEASE ENTER EXISTED USERID\nPUBLISH DAY < EXPIRED DAY ')
      return error.message
    } else {
      console.log('Unexpected error: ', error)
      alert('An unexpected error has occurred')
      return 'An unexpected error has occired'
    }
  }
}

export const editVoucher = async (formData) => {
  try {
    const response = await axios.put(api + '/voucher/updatedvoucher', formData)
    return response.data
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

export const deleteVoucher = async (voucherId) => {
  try {
    const response = await axios.delete(
      api + `/voucher/deletevoucher?VoucherId=${voucherId}`
    )
    return response.data
  } catch (error) {
    console.error(error)
  }
}

const getVouchers = async (params) => {
  try {
    const response = await axios.get(api + '/voucher/viewlistvoucher', {
      params,
    })
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}
export { getVouchers }
export const getAllUsers = async () => {
  try {
    const data = await axios.get(api + '/user/view-list-users')
    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorData = error.response?.data || error.message
      console.log('error message: ', errorData.message)
      return errorData
    } else {
      console.log('Unexpected error: ', error)
      return 'An unexpected error has occured'
    }
  }
}
export const addUser = async (formData) => {
  try {
    const data = await axios.post(api + '/user/create-user', formData)
    console.log(data)
    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorData = error.response?.data || error.message
      console.log('error message: ', errorData.message)
      return errorData
    } else {
      console.log('Unexpected error: ', error)
      return 'An unexpected error has occurred'
    }
  }
}
