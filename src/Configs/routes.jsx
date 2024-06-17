import StaffHomepage from '../Page/StaffHomepage'
import AdminHomepage from '../Page/AdminHomepage'
import Login from '../Components/Login'
import ManagerPage from '../Page/ManagerPage'
import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import ProtectedRoutes from './ProtectedRoutes'
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
    ],
  },
])
