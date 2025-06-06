import { API_URL } from '../config';
import { api } from '../axios/user';

export const API_CONFIG = {
    BASE_URL: API_URL,
    headers: {
      accept: "application/json",
    },
};

// Thêm món ăn vào giỏ hàng
export const addToCart = async ({ foodId, quantity }) => {
    try {
        const response = await api.post(`${API_CONFIG.BASE_URL}/api/cart/add`, {
            foodId,
            quantity
        });
        return response.data;
    } catch (error) {
        const apiMessage = error.response?.data?.message || error.message;
        throw new Error(apiMessage);
    }
}

// Lấy thông tin giỏ hàng
export const getCartInfo = async () => {
    try {
        const response = await api.get(`${API_CONFIG.BASE_URL}/api/cart`);
        return response.data; // { userId, items: [{ foodId, quantity }] }
    } catch (error) {
        const apiMessage = error.response?.data?.message || error.message;
        throw new Error(apiMessage);
    }
} 