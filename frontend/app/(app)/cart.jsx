import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useCart } from '@/contexts/cart-context';
import { Header } from '@/components/Header';
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Cart = () => {
  const router = useRouter();
  const { bookingId, requirePayment } = useLocalSearchParams();
  const { cart, loading, initiatePayment, handlePaymentReturn } = useCart();
  const [totalAmount, setTotalAmount] = useState(0);

  // Calculate total amount
  useEffect(() => {
    if (cart?.items) {
      const total = cart.items.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
      }, 0);
      setTotalAmount(total);
    }
  }, [cart]);

  // Handle back press
  const handleBackPress = useCallback(() => {
    router.back();
  }, [router]);

  // Handle payment
  const handlePayment = useCallback(async () => {
    try {
      if (!cart?._id) {
        Alert.alert('Lỗi', 'Không tìm thấy giỏ hàng');
        return;
      }

      const paymentUrl = await initiatePayment(cart._id);
      if (paymentUrl) {
        // Open payment URL in browser
        await Linking.openURL(paymentUrl);
      }
    } catch (error) {
      Alert.alert('Lỗi', error.message);
    }
  }, [cart, initiatePayment]);

  // Render cart item
  const renderCartItem = useCallback(({ item }) => (
    <View style={styles.cartItem}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemQuantity}>x{item.quantity}</Text>
      </View>
      <Text style={styles.itemPrice}>${item.price * item.quantity}</Text>
    </View>
  ), []);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <SafeAreaView style={styles.container}>
        <Header 
          title="Giỏ hàng" 
          hasReturn={true} 
          onPressReturn={handleBackPress}
        />

        <View style={styles.content}>
          {cart?.items?.length > 0 ? (
            <>
              <FlatList
                data={cart.items}
                keyExtractor={(item) => item._id}
                renderItem={renderCartItem}
                contentContainerStyle={styles.listContainer}
              />

              <View style={styles.footer}>
                <View style={styles.totalContainer}>
                  <Text style={styles.totalLabel}>Tổng cộng:</Text>
                  <Text style={styles.totalAmount}>${totalAmount}</Text>
                </View>

                <TouchableOpacity 
                  style={styles.paymentButton}
                  onPress={handlePayment}
                  disabled={loading}
                >
                  <Text style={styles.paymentButtonText}>
                    {loading ? 'Đang xử lý...' : 'Thanh toán'}
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <View style={styles.emptyContainer}>
              <Icon name="cart-outline" size={64} color="#ccc" />
              <Text style={styles.emptyText}>Giỏ hàng trống</Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: wp('4%'),
  },
  listContainer: {
    paddingVertical: hp('2%'),
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp('2%'),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: hp('2%'),
    fontWeight: 'bold',
  },
  itemQuantity: {
    fontSize: hp('1.8%'),
    color: '#666',
    marginTop: hp('0.5%'),
  },
  itemPrice: {
    fontSize: hp('2%'),
    fontWeight: 'bold',
    color: '#2E8B57',
  },
  footer: {
    paddingVertical: hp('2%'),
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  totalLabel: {
    fontSize: hp('2.2%'),
    fontWeight: 'bold',
  },
  totalAmount: {
    fontSize: hp('2.4%'),
    fontWeight: 'bold',
    color: '#2E8B57',
  },
  paymentButton: {
    backgroundColor: '#2E8B57',
    paddingVertical: hp('2%'),
    borderRadius: 8,
    alignItems: 'center',
  },
  paymentButtonText: {
    color: '#fff',
    fontSize: hp('2%'),
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: hp('2%'),
    color: '#666',
    marginTop: hp('1%'),
  },
});

export default Cart;