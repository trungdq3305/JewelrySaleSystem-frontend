import axios from 'axios'

const api = 'https://localhost:7093/api'
export const getAllProducts = async (
  productId,
  productName,
  Category,
  Material
) => {
  try {
    const query = `?ProductId=${productId}&ProductName=${productName}&Category=${Category}&Material=${Material}`
    const data = await axios.get(api + '/products/view-product' + query)
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
