import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || 'http://localhost:5000', // Đảm bảo `REACT_APP_BASE_URL` từ .env
  timeout: 5000, // Tăng timeout nếu API xử lý lâu
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('authToken'); // Lấy token từ localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response) {
      const { status, data } = error.response;
      // Handle specific HTTP errors
      if (status === 401) {
        console.warn('Unauthorized: Redirecting to login...');
        // Redirect user to login page if not authorized
        window.location.href = '/login';
      } else if (status === 500) {
        console.error('Server error:', data.message || 'Something went wrong');
      }
    } else {
      console.error('Network error or no response:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
