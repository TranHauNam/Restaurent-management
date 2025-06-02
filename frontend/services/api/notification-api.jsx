import { API_URL } from '../config';
import { api } from '../axios/user';

export const API_CONFIG = {
    BASE_URL: API_URL,
    headers: {
      accept: "application/json",
    },
};

export const getNotifications = async () => {
    try {
        const response = await api.get(`${API_CONFIG.BASE_URL}/api/notification/`);
        return response.data;
    } catch (error) {
        // Lấy message từ API nếu có
        const apiMessage = error.response?.data?.message || error.message;
        throw new Error(apiMessage);
    }
}