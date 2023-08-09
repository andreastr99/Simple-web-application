// import axios from 'axios';
// import {logout} from './AssistingFunctions'
// const API_BASE_URL = 'http://localhost:8081/api';

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   withCredentials: true,
// });

// // Request interceptor
// api.interceptors.request.use(
//   async (config) => {
//     const token = localStorage.getItem('token');
//     // const refresh = await axios.get('http://localhost:8081/api/check_refresh_token')
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // // Response interceptor
// // api.interceptors.response.use(
// //   (response) => {
// //     return response;
// //   },
// //   (error) => {
// //     if (error.response && error.response.status === 401) {
// //       // Handle unauthorized errors (e.g., redirect to login page)
// //     } else {
// //       // Handle other errors
// //     }
// //     return Promise.reject(error);
// //   }
// // );

// // Response interceptor
// api.interceptors.response.use(
//   async (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     const accessToken = localStorage.getItem("token");


//     // Check if the error is due to an expired access token
//     // if (error.response && error.response.status === 401 && !originalRequest._retry) {
//       if ((!accessToken || error.response?.status === 401) && !originalRequest._retry) {
//       originalRequest._retry = true;

      
      
//       // if (!refreshToken) {
//       //   // If the refreshToken doesn't exist, return a 401 status code directly
//       //   return Promise.reject(error);
//       // }
      
//       // Make a request to the server to get a new access token using the refresh token
//       try {
//         const res = await api.post('http://localhost:8081/api/refresh-token', {withCredentials: true});
//         const newAccessToken = res.data.token;
//         console.log("cookie", res.request.status)
//         // Update the access token in localStorage
//         localStorage.setItem('token', newAccessToken);

//         // Retry the original request with the new access token
//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//         return api(originalRequest);
//       } catch (refreshError) {
//         // Handle refresh token errors, e.g., redirect to login page
//         console.log('Refresh token error:', refreshError);
//         logout();
//         return Promise.reject(refreshError);
//       }
//     }

//     // Handle other errors
//     return Promise.reject(error);
//   }
// );
// export default api;

import axios from 'axios';
import { logout } from './AssistingFunctions';

const API_BASE_URL = 'http://localhost:8081/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Add a request interceptor
api.interceptors.request.use( function (config) {
  // Do something before request is sent
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, function (error) {
  // Do something with request error
  console.log("request error", error)
  return Promise.reject(error);
});


// // Add a response interceptor
// api.interceptors.response.use(function (response) {
//   // Any status code that lie within the range of 2xx cause this function to trigger
//   // Do something with response data
//   return response;
// }, async function (error) {
//   // Any status codes that falls outside the range of 2xx cause this function to trigger
//   // Do something with response error
//   const originalRequest = error.config;
//     const accessToken = localStorage.getItem("token");

    
//     // Check if the error is due to an expired access token
//     // if (error.response && error.response.status === 401 && !originalRequest._retry) {
//       if ((!accessToken || error.response?.status === 401) && !originalRequest._retry) {
//       originalRequest._retry = true;

      
      
//       // if (!refreshToken) {
//       //   // If the refreshToken doesn't exist, return a 401 status code directly
//       //   return Promise.reject(error);
//       // }
      
//       // Make a request to the server to get a new access token using the refresh token
//       try {
//         const res = await axios.post('http://localhost:8081/api/refresh-token', {withCredentials: true});
//         console.log("dsgl.dfjb;f")
//         const newAccessToken = res.data.token;
//         console.log("ee", res.data)
//         console.log("cookie", res.request.status)
//         // Update the access token in localStorage
//         localStorage.setItem('token', newAccessToken);

//         // Retry the original request with the new access token
//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//         return api(originalRequest);
//       } catch (refreshError) {
//         // Handle refresh token errors, e.g., redirect to login page
//         console.log('Refresh token error:', refreshError);
//         logout();
//         return Promise.reject(refreshError);
//       }
//     }
//   return Promise.reject(error);
// });
api.interceptors.response.use(
  async (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
   try{
    await axios.get('http://localhost:8081/api/check_refresh_token', {withCredentials: true});
   } catch (refreshError) {
    // Handle refresh token errors, e.g., redirect to login page
    console.log('Refresh_token error:', refreshError);

    logout();
    return Promise.reject(refreshError);
  }
    if ((error.response?.status === 401) && !originalRequest._retry) {
      originalRequest._retry = true;
      // logout();
      // Make a request to the server to get a new access token using the refresh token
      try {
        const res = await api.post('/refresh-token');
        console.log("err", res.request)
        const newAccessToken = res.data.token;
        console.log("cookie", res.request.status)
        // Update the access token in localStorage
        localStorage.setItem('token', newAccessToken);

        // Retry the original request with the new access token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Handle refresh token errors, e.g., redirect to login page
        console.log('Refresh token error:', refreshError);

        logout();
        return Promise.reject(refreshError);
      }
    }

    // Handle other errors
    return Promise.reject(error);
  }
);

// // Add a response interceptor
// api.interceptors.response.use(async (response) => {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;
  
//     // Check if the error is due to an expired access token
//     // if (error.response && error.response.status === 401 && !originalRequest._retry) {
//       if ((error.response?.status === 401) && !originalRequest._retry) {
//       originalRequest._retry = true;

      
      
//       // if (!refreshToken) {
//       //   // If the refreshToken doesn't exist, return a 401 status code directly
//       //   return Promise.reject(error);
//       // }
      
//       // Make a request to the server to get a new access token using the refresh token
//       try {
//         const res = await api.post('http://localhost:8081/api/refresh-token');
//         const newAccessToken = res.data.token;
//         console.log("cookie", res.request.status)
//         // Update the access token in localStorage
//         localStorage.setItem('token', newAccessToken);

//         // Retry the original request with the new access token
//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//         return api(originalRequest);
//       } catch (refreshError) {
//         // Handle refresh token errors, e.g., redirect to login page
//         console.log('Refresh token error:', refreshError);
//         logout();
//         return Promise.reject(refreshError);
//       }
//     }

//     // Handle other errors
//     return Promise.reject(error);
//   }
// );

export default api;