import { API_URL } from '../config';
import { api } from '../axios/user';

export const API_CONFIG = {
    BASE_URL: API_URL,
    headers: {
      accept: "application/json",
    },
};

export const getFoodList = async () => {
    try {
        const response = await api.get(`${API_CONFIG.BASE_URL}/api/food`);
        return response.data;
    } catch (error) {
        // Lấy message từ API nếu có
        const apiMessage = error.response?.data?.message || error.message;
        throw new Error(apiMessage);
    }
}