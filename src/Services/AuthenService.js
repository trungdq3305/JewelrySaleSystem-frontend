import axios from 'axios'
import { handleError } from '../Helper/ErrorHandle'

const api = 'https://localhost:7093/api'
export const loginAPI = async (username, password) => {
  const payload = {
    username: username,
    password: password,
  }
  try {
    const data = await axios.post(api + '/authorize/login', payload)
    return data
  } catch (err) {
    handleError(err)
  }
}
