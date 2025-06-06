import React, { createContext, useState, useContext, useCallback } from 'react';
import { Alert } from 'react-native';
import { addToCart } from '@/services/api/cart-api';
import { createVNPayUrl, handleVNPayReturn } from '@/services/api/payment-api';

export const CartContext = createContext({
    cartItems: [],
    loading: false,
    addItemToCart: async () => {},
    removeItemFromCart: async () => {},
    clearCart: () => {},
    initiatePayment: async () => {},
    handlePaymentReturn: async () => {},
});

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]); // [{ foodId, quantity, food }]
    const [loading, setLoading] = useState(false);

    // Thêm hoặc cập nhật số lượng món trong giỏ hàng
    const addItemToCart = useCallback(async (foodId, quantity, foodDetails) => {
        try {
            setLoading(true);

            // Cập nhật state local trước
            setCartItems(prevItems => {
                const existingItemIndex = prevItems.findIndex(item => item.foodId === foodId);
                const newItems = [...prevItems];

                if (existingItemIndex > -1) {
                    // Cập nhật số lượng nếu món đã có trong giỏ
                    const newQuantity = newItems[existingItemIndex].quantity + quantity;
                    if (newQuantity <= 0) {
                        // Nếu số lượng mới <= 0, xóa món khỏi giỏ
                        return newItems.filter(item => item.foodId !== foodId);
                    }
                    newItems[existingItemIndex] = {
                        ...newItems[existingItemIndex],
                        quantity: newQuantity,
                        food: foodDetails // Cập nhật thông tin món ăn nếu có
                    };
                } else if (quantity > 0) {
                    // Chỉ thêm món mới nếu số lượng > 0
                    newItems.push({
                        foodId,
                        quantity,
                        food: foodDetails
                    });
                }

                return newItems;
            });

            // Gọi API để đồng bộ với backend
            await addToCart({
                foodId,
                quantity
            });

            return true;
        } catch (error) {
            Alert.alert('Lỗi', error.message);
            // Rollback state nếu API call thất bại
            setCartItems(prevItems => {
                const existingItemIndex = prevItems.findIndex(item => item.foodId === foodId);
                if (existingItemIndex > -1) {
                    const newItems = [...prevItems];
                    newItems[existingItemIndex].quantity -= quantity;
                    if (newItems[existingItemIndex].quantity <= 0) {
                        return newItems.filter(item => item.foodId !== foodId);
                    }
                    return newItems;
                }
                return prevItems;
            });
            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    // Xóa món khỏi giỏ hàng (sử dụng API với quantity = 0)
    const removeItemFromCart = useCallback(async (foodId) => {
        try {
            setLoading(true);
            const item = cartItems.find(item => item.foodId === foodId);
            if (!item) return;

            // Cập nhật state local trước
            setCartItems(prevItems => prevItems.filter(item => item.foodId !== foodId));

            // Gọi API để đồng bộ với backend (quantity = 0 để xóa)
            await addToCart({
                foodId,
                quantity: 0
            });

            return true;
        } catch (error) {
            Alert.alert('Lỗi', error.message);
            // Rollback state nếu API call thất bại
            setCartItems(prevItems => {
                if (!prevItems.find(item => item.foodId === foodId)) {
                    return [...prevItems, item];
                }
                return prevItems;
            });
            throw error;
        } finally {
            setLoading(false);
        }
    }, [cartItems]);

    // Xóa toàn bộ giỏ hàng
    const clearCart = useCallback(async () => {
        try {
            setLoading(true);
            // Lưu state cũ để có thể rollback
            const oldItems = [...cartItems];
            
            // Cập nhật state local
            setCartItems([]);

            // Gọi API để xóa từng món
            await Promise.all(
                oldItems.map(item => 
                    addToCart({
                        foodId: item.foodId,
                        quantity: 0
                    })
                )
            );

            return true;
        } catch (error) {
            Alert.alert('Lỗi', 'Không thể xóa giỏ hàng');
            // Rollback state nếu API call thất bại
            setCartItems(oldItems);
            throw error;
        } finally {
            setLoading(false);
        }
    }, [cartItems]);

    // Bắt đầu thanh toán
    const initiatePayment = useCallback(async () => {
        try {
            setLoading(true);
            const paymentUrl = await createVNPayUrl();
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
                await clearCart(); // Xóa giỏ hàng sau khi thanh toán thành công
            }
            return result;
        } catch (error) {
            Alert.alert('Lỗi', error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    }, [clearCart]);

    const value = {
        cartItems,
        loading,
        addItemToCart,
        removeItemFromCart,
        clearCart,
        initiatePayment,
        handlePaymentReturn,
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