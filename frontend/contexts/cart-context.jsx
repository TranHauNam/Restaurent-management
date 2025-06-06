import React, { createContext, useState, useContext, useCallback } from 'react';
import { Alert } from 'react-native';
import { addToCart, getCartInfo } from '@/services/api/cart-api';
import { createVNPayUrl, handleVNPayReturn } from '@/services/api/payment-api';
import { getOrderById, getOrderHistory } from '@/services/api/order-api';

export const CartContext = createContext({
    cart: null,
    loading: false,
    addItemToCart: async () => {},
    fetchCart: async () => {},
    initiatePayment: async () => {},
    handlePaymentReturn: async () => {},
    fetchOrderHistory: async () => {},
    fetchOrderDetails: async () => {},
});

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(null); // { userId, items: [{ foodId, quantity }] }
    const [loading, setLoading] = useState(false);

    // Thêm món vào giỏ hàng
    const addItemToCart = useCallback(async (foodId, quantity) => {
        try {
            setLoading(true);
            const response = await addToCart({
                foodId,
                quantity
            });
            await fetchCart(); // Refresh cart data
            return response;
        } catch (error) {
            Alert.alert('Lỗi', error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    // Lấy thông tin giỏ hàng
    const fetchCart = useCallback(async () => {
        try {
            setLoading(true);
            const cartData = await getCartInfo();
            setCart(cartData);
            return cartData;
        } catch (error) {
            Alert.alert('Lỗi', error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    // Bắt đầu thanh toán VNPay
    const initiatePayment = useCallback(async (cartId) => {
        try {
            setLoading(true);
            const paymentUrl = await createVNPayUrl(cartId);
            // Mở URL thanh toán (sẽ implement sau)
            return paymentUrl;
        } catch (error) {
            Alert.alert('Lỗi', error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    // Xử lý callback từ VNPay
    const handlePaymentReturn = useCallback(async (params) => {
        try {
            setLoading(true);
            const result = await handleVNPayReturn(params);
            if (result.success) {
                // Nếu thanh toán thành công, clear cart và fetch order details
                setCart(null);
                if (result.orderId) {
                    return await fetchOrderDetails(result.orderId);
                }
            }
            return result;
        } catch (error) {
            Alert.alert('Lỗi', error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    // Lấy lịch sử đơn hàng
    const fetchOrderHistory = useCallback(async () => {
        try {
            setLoading(true);
            const history = await getOrderHistory();
            return history;
        } catch (error) {
            Alert.alert('Lỗi', error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    // Lấy chi tiết đơn hàng
    const fetchOrderDetails = useCallback(async (orderId) => {
        try {
            setLoading(true);
            const details = await getOrderById(orderId);
            return details;
        } catch (error) {
            Alert.alert('Lỗi', error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    const value = {
        cart,
        loading,
        addItemToCart,
        fetchCart,
        initiatePayment,
        handlePaymentReturn,
        fetchOrderHistory,
        fetchOrderDetails,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}; 