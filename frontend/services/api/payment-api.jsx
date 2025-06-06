import { API_URL } from '../config';
import { api } from '../axios/user';

export const API_CONFIG = {
    BASE_URL: API_URL,
    headers: {
      accept: "application/json",
    },
};

// Tạo URL thanh toán VNPay
export const createVNPayUrl = async (cartId) => {
    try {
        const response = await api.post(`${API_CONFIG.BASE_URL}/api/payment/vnpay`, {
            cartId
        });
        return response.data.paymentUrl; // Trả về trực tiếp URL thanh toán
    } catch (error) {
        const apiMessage = error.response?.data?.message || error.message;
        throw new Error(apiMessage);
    }
}

// Xử lý callback từ VNPay
export const handleVNPayReturn = async (params) => {
    try {
        // params sẽ chứa các thông tin từ VNPay callback:
        // vnp_TxnRef, vnp_TransactionNo, vnp_ResponseCode, vnp_PayDate
        const response = await api.get(`${API_CONFIG.BASE_URL}/api/payment/vnpay_return`, {
            params
        });
        return response.data; // { success: boolean, orderId?: string, message: string }
    } catch (error) {
        const apiMessage = error.response?.data?.message || error.message;
        throw new Error(apiMessage);
    }
} 