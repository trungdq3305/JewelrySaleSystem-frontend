import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../Context/UserContext'

const ProtectedRoutes = ({ children, allowedRoles }) => {
  const location = useLocation()
  const { isLogin, user } = useAuth() // Ensure useAuth provides the user object

  if (!isLogin()) {
    // User is not logged in
    return <Navigate to="/" state={{ from: location }} replace />
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // User does not have the required role
    return <Navigate to="/" state={{ from: location }} replace />
  }

  // User is logged in and has the required role
  return <>{children}</>
}

export default ProtectedRoutes
