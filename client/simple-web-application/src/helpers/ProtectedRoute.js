import { Navigate, Outlet } from 'react-router-dom'
import { useContext, useEffect } from 'react';
import AuthContext from './AuthProvider';

const ProtectedRoute = () => {
    const { auth } = useContext(AuthContext)

    useEffect(() =>{
        console.log("auth", auth)
    }, [])
  return (
    auth ? <Outlet /> : <Navigate to='/' />
  )
}

export default ProtectedRoute;