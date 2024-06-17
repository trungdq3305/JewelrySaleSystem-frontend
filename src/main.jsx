import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import GlobalStyles from './Components/GlobalStyles/index.jsx'
import { ToastContainer } from 'react-toastify'
import { router } from '../src/Configs/routes.jsx'
import { RouterProvider } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <UserProvider>
  <React.StrictMode>
    <GlobalStyles>
      <RouterProvider router={router} />
      {/* <ToastContainer /> */}
    </GlobalStyles>
  </React.StrictMode>
  // </UserProvider>
)
