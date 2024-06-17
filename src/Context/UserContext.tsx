import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { loginAPI } from '../Services/AuthenService'

// Define the shape of the user object and context
type User = {
  userId: string
  username: string
  fullname: string
  role: number
}

type UserContextType = {
  user: User | null
  token: string | null
  loginUser: (username: string, password: string) => void
  logOut: () => void
  isLogin: () => boolean
}

type Props = { children: React.ReactNode }

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate()
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    const storedToken = localStorage.getItem('token')
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser))
      setToken(storedToken)
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + storedToken
    }
    setIsReady(true)
  }, [])

  const loginUser = async (username: string, password: string) => {
    try {
      const result = await loginAPI(username, password)
      if (result && result.data && result.data.data) {
        const userObj: User = {
          userId: result.data.data.loginResModel.userId,
          username: result.data.data.loginResModel.username,
          fullname: result.data.data.loginResModel.fullname,
          role: result.data.data.loginResModel.role,
        }

        localStorage.setItem('token', result.data.data.token)
        localStorage.setItem('user', JSON.stringify(userObj))

        setToken(result.data.data.token)
        setUser(userObj)

        switch (userObj.role) {
          case 1:
            navigate('/StaffPage')
            toast.success('Login success')

            break
          case 2:
            navigate('/ManagePage')
            toast.success('Login success')

            break
          case 3:
            navigate('/AdminPage')
            toast.success('Login success')

            break
          default:
            navigate('/')
            toast.error('Login Failed')
        }
      }
    } catch (ex) {
      toast.warning('Server Error')
    }
  }

  const isLogin = () => {
    return !!user
  }

  const logOut = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setUser(null)
    setToken(null)
    navigate('/')
  }

  return (
    <UserContext.Provider value={{ loginUser, user, token, logOut, isLogin }}>
      {isReady ? children : null}
    </UserContext.Provider>
  )
}

export const useAuth = () => {
  const context = React.useContext(UserContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within a UserProvider')
  }
  return context
}
