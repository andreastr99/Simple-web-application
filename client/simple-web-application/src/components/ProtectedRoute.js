import { Navigate, Outlet } from 'react-router-dom'
import AxiosRequests from './axios';


const ProtectedRoute = () => {
  const accessToken = localStorage.getItem("token");
  // const refreshToken = await AxiosRequests.checkRefreshToken();
  // console.log("refresh", refreshToken.status)
  return (
    accessToken ? <Outlet /> : <Navigate to='/' />
  )
}

export default ProtectedRoute;

// import { Navigate, Outlet } from 'react-router-dom';

// const ProtectedRoute = () => {
//   const refreshToken = document.cookie.replace(
//     /(?:(?:^|.*;\s*)refreshToken\s*=\s*([^;]*).*$)|^.*$/,
//     '$1'
//   );
//   const accessToken = localStorage.getItem("token");

//   // Check if both refresh token and access token exist
//   const isAuthenticated = refreshToken && accessToken;

//   return (
//     !isAuthenticated ? <Outlet /> : <Navigate to='/' />
//   );
// }

// export default ProtectedRoute;

// import React from 'react';
// import { Outlet, Navigate } from 'react-router-dom';
// import {useAuth} from './AssistingFunctions';

// const ProtectedRoute = () => {
//   // Check authentication using the useAuth hook
//   const isAuthenticated = useAuth();

//   return isAuthenticated ? <Outlet /> :<Navigate to='/home' />;
// };

// export default ProtectedRoute;
