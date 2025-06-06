import { API_URL } from '../config';
import { api } from '../axios/user';

export const API_CONFIG = {
    BASE_URL: API_URL,
    headers: {
      accept: "application/json",
    },
};

// Lấy lịch sử đơn đặt hàng
export const getOrderHistory = async () => {
    try {
        const response = await api.get(`${API_CONFIG.BASE_URL}/api/order/history`);
        return response.data;
    } catch (error) {
        const apiMessage = error.response?.data?.message || error.message;
        throw new Error(apiMessage);
    }
}

// Lấy chi tiết đơn đặt hàng theo ID
export const getOrderById = async (orderId) => {
    try {
        const response = await api.get(`${API_CONFIG.BASE_URL}/api/order/${orderId}`);
        return response.data;
    } catch (error) {
        const apiMessage = error.response?.data?.message || error.message;
        throw new Error(apiMessage);
    }
} 