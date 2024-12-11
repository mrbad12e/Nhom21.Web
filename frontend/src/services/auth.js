// src/utils/auth.js
import axios from 'axios';
import { API_URL } from '@/utils/constants';

export const checkAuth = async () => {
    try {
        const response = await axios.get(`${API_URL}/client/check`, { withCredentials: true });
        return response.data.user; // Token hợp lệ
    } catch (error) {
        return null; // Token không hợp lệ hoặc đã hết hạn
    }
};

export const logout = async () => {
    try {
        await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
    } catch (error) {
        console.error('Logout failed:', error);
    }
};
