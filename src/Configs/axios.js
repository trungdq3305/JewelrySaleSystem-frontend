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
    const data = await axios.put(api + '/products/productidupdate')
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
export const getAllGem = async () => {
  try {
    const reponse = await axios.get(api + '/gem/viewlistgem')
    return response.data
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

export const addGem = async (formData) => {
  try {
    const data = await axios.post(api + '/gem/creategem', formData)
    console.log(data)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error massage: ', error.message)
      alert('PLEASE ENTER NAME OF DIAMOND OR THAT IS NAME WAS EXISTED')
      return error.message
    } else {
      console.log('Unexpected error: ', error)
      alert('An unexpected error has occurred')
      return 'An unexpected error has occired'
    }
  }
}

export const updateGem = async (formData) => {
  try {
    const response = await axios.put(api + '/gem/updategem', formData)
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

const getGems = async (params) => {
  try {
    const response = await axios.get(api + '/gem/viewlistgem', { params });
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
export { getGems };

export const updateDiscount = async (formData) => {
  try {
    const response = await axios.put(api + '/discount/update-discount', formData)
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

export const addDiscount = async (formData) => {
  try {
    const data = await axios.post(api + '/discount/create-discount', formData)
    console.log(data)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error massage: ', error.message)
      alert('Cost >= 10000 /nExpired Day must be later than publish day')
      return error.message
    } else {
      console.log('Unexpected error: ', error)
      alert('An unexpected error has occurred')
      return 'An unexpected error has occired'
    }
  }
}

const getDiscount = async (params) => {
  try {
    const response = await axios.get(api + '/discount/view-discount', { params });
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
export { getDiscount };
export const deleteDiscount = async (discountid) => {
  try {
    const response = await axios.delete(
      api + `/discount/delete-discount?discountid=${discountid}`
    )
    return response.data
  } catch (error) {
    console.error(error)
  }
}