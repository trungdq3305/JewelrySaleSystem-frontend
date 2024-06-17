import axios from 'axios'
import { error } from 'console'
import { toast } from 'react-toastify'

export const handleError = (error: any) => {
  if (axios.isAxiosError(error)) {
    if (error.response?.data.code === 401) {
      toast.error('Đăng nhập thất bại: Không tìm thấy người dùng!')
    }
    if (error.response?.data.code === 403) {
      toast.error('Đăng nhập thất bại: Bạn không có quyền truy cập!')
    }
    window.history.pushState({}, 'LoginPage', '/')
  }
  if (error.response?.data.code === 200) {
    toast.success('Đăng nhập thành công')
  }
}
