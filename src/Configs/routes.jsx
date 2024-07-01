import StaffHomepage from '../Page/StaffHomepage'
import AdminHomepage from '../Page/AdminHomepage'
import Login from '../Components/Login'
import ManagerPage from '../Page/ManagerPage'
import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import ProtectedRoutes from './ProtectedRoutes'
import ManagerHomePage from '../Page/ManagerHomePage'
import ProductDetailPage from '../Page/ProductDetailPage'
import BillPage from '../Page/BillPage'
export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <Login /> },
      {
        path: 'StaffPage',
        element: (
          <ProtectedRoutes allowedRoles={[1, 2]}>
            <StaffHomepage />
          </ProtectedRoutes>
        ),
      },
      {
        path: 'AdminPage',
        element: (
          <ProtectedRoutes allowedRoles={[3]}>
            <AdminHomepage />
          </ProtectedRoutes>
        ),
      },
      {
        path: 'ManagePage',
        element: (
          <ProtectedRoutes allowedRoles={[2]}>
            <ManagerPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: 'ManagerHomePage',
        element: (
          <ProtectedRoutes allowedRoles={[2]}>
            <ManagerHomePage />
          </ProtectedRoutes>
        ),
      },
      {
        path: 'ViewDetailPage/:id',
        element: (
          <ProtectedRoutes allowedRoles={[1, 2]}>
            <ProductDetailPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: 'BillPage',
        element: (
          <ProtectedRoutes allowedRoles={[1, 2]}>
            <BillPage />
          </ProtectedRoutes>
        ),
      },
    ],
  },
])
