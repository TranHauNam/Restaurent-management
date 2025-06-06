import { API_URL } from '../config';
import { api } from '../axios/user';

export const API_CONFIG = {
    BASE_URL: API_URL,
    headers: {
      accept: "application/json",
    },
};

// Tạo URL thanh toán VNPay
export const createVNPayUrl = async () => {
    try {
        const response = await api.post(`${API_CONFIG.BASE_URL}/api/payment/vnpay`);
        return response.data.paymentUrl;
    } catch (error) {
        const apiMessage = error.response?.data?.message || error.message;
        throw new Error(apiMessage);
    }
};

// Xử lý callback từ VNPay
export const handleVNPayReturn = async (params) => {
    try {
        const response = await api.get(`${API_CONFIG.BASE_URL}/api/payment/vnpay_return`, {
            params
        });
        return response.data;
    } catch (error) {
        const apiMessage = error.response?.data?.message || error.message;
        throw new Error(apiMessage);
    }
}; 