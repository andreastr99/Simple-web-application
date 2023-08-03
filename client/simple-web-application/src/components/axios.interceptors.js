import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized errors (e.g., redirect to login page)
    } else {
      // Handle other errors
    }
    return Promise.reject(error);
  }
);

// // Response interceptor
// api.interceptors.response.use(
//   async (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;

//     // Check if the error is due to an expired access token
//     if (error.response && error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       // Get the refresh token from the cookie
//       const refreshToken = document.cookie.replace(
//         /(?:(?:^|.*;\s*)refreshToken\s*=\s*([^;]*).*$)|^.*$/,
//         '$1'
//       );

//       // const refreshToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU3NmYxMTAzLTE0MDktNGRkMi05M2FjLTRjMDk1N2I0MDIxYiIsInVzZXJuYW1lIjoiYW5kcmVhcyIsImlhdCI6MTY5MDk3NjczNCwiZXhwIjoxNjkxNTgxNTM0fQ._MrosC8upebvC-vEO9TYtUxoENb0QCa6_ucfqTZO_J4"

//       // Make a request to the server to get a new access token using the refresh token
//       try {
//         const res = await api.post('http://localhost:8081/api/refresh-token', { refreshToken });
//         const newAccessToken = res.data.token;

//         // Update the access token in localStorage
//         localStorage.setItem('token', newAccessToken);

//         // Retry the original request with the new access token
//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//         return api(originalRequest);
//       } catch (refreshError) {
//         // Handle refresh token errors, e.g., redirect to login page
//         console.log('Refresh token error:', refreshError);
//         return Promise.reject(refreshError);
//       }
//     }

//     // Handle other errors
//     return Promise.reject(error);
//   }
// );
export default api;