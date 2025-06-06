import React from 'react';
import {
  View, Text, StatusBar,
  TouchableOpacity, ScrollView,
  SafeAreaView, FlatList,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from '@/styles/cart/main';
import { Header } from '@/components/Header';
import { useCart } from '@/contexts/cart-context';

const CartItem = ({ item, onUpdateQuantity }) => {
  const handleIncrease = () => onUpdateQuantity(item.foodId, item.quantity + 1);
  const handleDecrease = () => onUpdateQuantity(item.foodId, Math.max(0, item.quantity - 1));

  return (
    <View style={styles.cartItem}>
      <View style={styles.itemContent}>
        <Text style={styles.itemTitle}>{item.food?.name || 'Loading...'}</Text>
        <Text style={styles.itemDescription}>{item.food?.description}</Text>
        <Text style={styles.itemPrice}>{(item.food?.price || 0).toLocaleString('vi-VN')}đ</Text>
      </View>
      <View style={styles.quantityControls}>
        <TouchableOpacity style={styles.quantityButton} onPress={handleDecrease}>
          <Icon name="remove" size={16} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity style={styles.quantityButton} onPress={handleIncrease}>
          <Icon name="add" size={16} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Cart = () => {
  const router = useRouter();
  const { cartItems, loading, addItemToCart, removeItemFromCart, initiatePayment } = useCart();

  const hasItems = cartItems.length > 0;

  const handleUpdateQuantity = async (foodId, newQuantity) => {
    try {
      const item = cartItems.find(item => item.foodId === foodId);
      if (!item) return;

      if (newQuantity <= 0) {
        removeItemFromCart(foodId);
      } else {
        const quantityDiff = newQuantity - item.quantity;
        if (quantityDiff !== 0) {
          await addItemToCart(foodId, quantityDiff, item.food);
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update quantity. Please try again.');
      console.error('Failed to update quantity:', error);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const foodItem = item.food;
      return total + ((foodItem?.price || 0) * item.quantity);
    }, 0);
  };

  const handleBackPress = () => {
    router.back();
  };

  const handleCheckout = async () => {
    try {
      const paymentUrl = await initiatePayment();
      // TODO: Handle payment URL (e.g., open in WebView)
      console.log('Payment URL:', paymentUrl);
    } catch (error) {
      Alert.alert('Error', 'Failed to initiate payment. Please try again.');
      console.error('Failed to initiate payment:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Fixed Header */}
      <View style={styles.headerContainer}>
        <Header title="Giỏ Hàng" hasReturn={true} onPressReturn={handleBackPress} />
      </View>

      {/* Scrollable Content */}
      <View style={[
        styles.contentContainer,
        hasItems && styles.contentWithFooter
      ]}>
        {loading ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Loading...</Text>
          </View>
        ) : (
          <FlatList
            data={cartItems}
            keyExtractor={item => item.foodId}
            renderItem={({ item }) => (
              <CartItem 
                item={item} 
                onUpdateQuantity={handleUpdateQuantity}
              />
            )}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={() => (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Giỏ hàng trống</Text>
              </View>
            )}
          />
        )}
      </View>

      {/* Fixed Footer - Only show when there are items */}
      {hasItems && (
        <View style={styles.footer}>
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Tổng cộng:</Text>
            <Text style={styles.totalAmount}>
              {calculateTotal().toLocaleString('vi-VN')}đ
            </Text>
          </View>
          <TouchableOpacity 
            style={styles.checkoutButton}
            onPress={handleCheckout}
            disabled={loading}
          >
            <Text style={styles.checkoutButtonText}>
              {loading ? 'Đang xử lý...' : 'Thanh Toán'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Cart; 