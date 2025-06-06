import React from 'react';
import {
  View, Text, StatusBar,
  TouchableOpacity, ScrollView,
  SafeAreaView, FlatList
} from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from '@/styles/cart/main';
import { Header } from '@/components/Header';

const CartItem = ({ item }) => (
  <View style={styles.cartItem}>
    <View style={styles.itemContent}>
      <Text style={styles.itemTitle}>{item.name}</Text>
      <Text style={styles.itemDescription}>{item.description}</Text>
      <Text style={styles.itemPrice}>{item.price.toLocaleString('vi-VN')}đ</Text>
    </View>
    <View style={styles.quantityBadge}>
      <Text style={styles.quantityText}>x{item.quantity}</Text>
    </View>
  </View>
);

const Cart = () => {
  const router = useRouter();

  // Mock data - will be replaced with real cart data
  const cartItems = [
    {
      _id: '1',
      name: 'Phở Bò',
      description: 'Phở bò truyền thống với nước dùng đậm đà',
      price: 45000,
      quantity: 2
    },
    {
      _id: '2',
      name: 'Bún Chả',
      description: 'Bún chả Hà Nội với thịt nướng thơm ngon',
      price: 40000,
      quantity: 1
    }
  ];

  const hasItems = cartItems.length > 0;

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleBackPress = () => {
    router.back();
  };

  const handleCheckout = () => {
    // TODO: Implement checkout logic
    console.log('Proceeding to checkout...');
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
        <FlatList
          data={cartItems}
          keyExtractor={item => item._id}
          renderItem={({ item }) => <CartItem item={item} />}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Giỏ hàng trống</Text>
            </View>
          )}
        />
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
            style={[
              styles.checkoutButton,
              !hasItems && styles.checkoutButtonDisabled
            ]}
            onPress={handleCheckout}
            disabled={!hasItems}
          >
            <Text style={[
              styles.checkoutButtonText,
              !hasItems && styles.checkoutButtonTextDisabled
            ]}>
              Thanh Toán
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Cart;