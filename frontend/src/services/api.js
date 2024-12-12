// api.js
import axios from 'axios';
import { API_URL } from '@/utils/constants';

const axiosInstance = axios.create({
    baseURL: API_URL.trim(),
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Use request interceptor instead of response
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor for error handling
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('auth');
            localStorage.removeItem('profile');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;