import axios from 'axios';
// import { logout } from '../helpers/AssistingFunctions';

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


api.interceptors.response.use(
  async (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
   try{
    await axios.get('http://localhost:8081/api/check-refresh-token', {withCredentials: true});
   } catch (refreshError) {
    // Handle refresh token errors, e.g., redirect to login page
    console.log('Refresh token error:', refreshError);

    // logout();
    localStorage.removeItem('token');
    return Promise.reject(refreshError);
  }
    if ((error.response?.status === 401) && !originalRequest._retry) {
      originalRequest._retry = true;
  
      // Make a request to the server to get a new access token using the refresh token
      try {
        const res = await api.post('/refresh-token');
        const newAccessToken = res.data.token;
        // console.log("cookie", res.request.status)
        // Update the access token in localStorage
        localStorage.setItem('token', newAccessToken);

        // Retry the original request with the new access token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Handle refresh token errors, e.g., redirect to login page
        console.log('Refresh token error:', refreshError);

        // logout();
        return Promise.reject(refreshError);
      }
    }

    // Handle other errors
    return Promise.reject(error);
  }
);

export default api;