// import { Navigate, Outlet } from 'react-router-dom'

// const ProtectedRoute = () => {
//   const accessToken = localStorage.getItem("token");
//   return (
//     accessToken ? <Outlet /> : <Navigate to='/' />
//   )
// }

// export default ProtectedRoute;

import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const refreshToken = document.cookie.replace(
    /(?:(?:^|.*;\s*)refreshToken\s*=\s*([^;]*).*$)|^.*$/,
    '$1'
  );
  const accessToken = localStorage.getItem("token");

  // Check if both refresh token and access token exist
  const isAuthenticated = refreshToken && accessToken;

  return (
    !isAuthenticated ? <Outlet /> : <Navigate to='/' />
  );
}

export default ProtectedRoute;
