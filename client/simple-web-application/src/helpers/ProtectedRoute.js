import { Navigate, Outlet } from 'react-router-dom'
import { useContext, useEffect } from 'react';
import AuthContext from './AuthProvider';

const ProtectedRoute = () => {
  const { auth } = useContext(AuthContext)

  return (
    auth ? <Outlet /> : <Navigate to='/' />
  )
}

export default ProtectedRoute;