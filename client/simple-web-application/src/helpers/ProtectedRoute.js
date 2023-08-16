import { Navigate, Outlet } from 'react-router-dom'
import { useContext } from 'react';
import AuthContext from './AuthProvider';

const ProtectedRoute = () => {
  const { auth } = useContext(AuthContext)

  console.log("auth", auth)
  return (
    auth ? <Outlet /> : <Navigate to='/' />
  )
}

export default ProtectedRoute;