import axios from 'axios';
import { useNavigate } from 'react-router-dom'
const API_BASE_URL = 'http://localhost:8081/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});



// // Request interceptor
// api.interceptors.request.use(
//   async (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token')
    
 

    if (token) {
      config.headers.Authorization = token;
    }

 

    try {
      const response = await api.post('/refresh-token'); // Replace with your API endpoint to check for refresh token
      const refreshTokenPresent = response.headers['refreshToken'];

 

      if (token && !refreshTokenPresent) {
        // this.authService.logout(); // Log out and clear tokens
        localStorage.removeItem('token')
        // Redirect to login page or perform other logout logic
      }
    } catch (error) {
      // Handle error checking for refresh token presence
    }

 

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// // Response interceptor
// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       // Handle unauthorized errors (e.g., redirect to login page)
//     } else {
//       // Handle other errors
//     }
//     return Promise.reject(error);
//   }
// );

// // Response interceptor
// api.interceptors.response.use(
//   async (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     const accessToken = localStorage.getItem("token");
//     // Get the refresh token from the cookie
//     const refreshToken = document.cookie.replace(
//       /(?:(?:^|.*;\s*)refreshToken\s*=\s*([^;]*).*$)|^.*$/,
//       '$1'
//     );


//     // Check if the error is due to an expired access token
//     // if (error.response && error.response.status === 401 && !originalRequest._retry) {
//     // if ((!accessToken || error.response?.status === 401) && !originalRequest._retry) {
//     //   originalRequest._retry = true;


//       // // Make a request to the server to get a new access token using the refresh token
//       // try {

//       //   // const refresh = await axios.get('http://localhost:8081/api/check_refresh_token')
//       //   // console.log("status", refresh.status)
//       //   const res = await api.post('http://localhost:8081/api/refresh-token');
//       //   const newAccessToken = res.data.token;
//       //   console.log("cookie", res.request.status)
//       //   // Update the access token in localStorage
//       //   localStorage.setItem('token', newAccessToken);

//       //   // Retry the original request with the new access token
//       //   originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//       //   return api(originalRequest);
//       // } catch (refreshError) {
         
//       //   // Handle refresh token errors, e.g., redirect to login page
//       //   // console.log('Refresh token error:', refreshError);
//       //   console.error('Refresh token error:', refreshError);
//       //   // Add this line to log the full error object
//       //   console.log('Full error object:', refreshError);
//       //   localStorage.removeItem('token');
//       //   // await axios.post('http://localhost:8081/api/logout', {withCredentials: true})

//       //   return Promise.reject(refreshError);
//       // }
//     }

//     // Handle other errors
//     // return Promise.reject(error);
//   // }
// );
export default api;

// import axios from 'axios';

// const axiosInstance = axios.create({
//   baseURL: 'http://localhost:8081/api', // Replace with your API base URL
//   timeout: 5000, // Adjust the timeout value as needed
// });


// async function refreshAccessToken() {
//   try {
//     const response = await axios.post('http://localhost:8081/api/refresh-token'); // Replace with your refresh token endpoint
//     const newAccessToken = response.data.access_token;
//     // Save the new access token to your cookie or local storage
//     // Example: document.cookie = `access_token=${newAccessToken}; path=/; expires=...`;
//     return newAccessToken;
//   } catch (error) {
//     // Handle any errors that occur during the token refresh process
//     throw error;
//   }
// }


// // // Request interceptor to add the access token to the request headers
// // axiosInstance.interceptors.request.use(
// //   (config) => {
// //     const accessToken = getAccessTokenFromCookie(); // Implement this function to retrieve the access token from the cookie
// //     if (accessToken) {
// //       config.headers.Authorization = `Bearer ${accessToken}`;
// //     }
// //     return config;
// //   },
// //   (error) => {
// //     return Promise.reject(error);
// //   }
// // );
// // Request interceptor
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response interceptor to handle token expiration and refresh the token
// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         const newAccessToken = await refreshAccessToken();
//         // Retry the original request with the new access token
//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         // Handle the refresh error, maybe log the user out or redirect to login page
//         throw refreshError;
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance

