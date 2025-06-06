//---------------------- Book Mon An.-------------------
// Nhan chon so luong mon - xac nhan gia tien
// Thanh toan
// Nhan thong bao

// xu ly cai back end cua book mon di
// bookecontext - done
// Hien thi menu theo nha hang

// Hien full menu - chua



import React from 'react';

import {
  useState, useEffect, useRef,
} from 'react'

import { 
  View, Text, StatusBar,
  TouchableOpacity, ScrollView,
  Image, FlatList, SafeAreaView,
  Alert,
} from 'react-native'

import { useFoodContext } from '@/contexts/food-context';
import { useCart } from '@/contexts/cart-context';
import { foodData } from '@/data/mocking/food';
import { Header } from '@/components/Header';
import { styles } from '@/styles/menu/main';
import { Typography } from '@/styles/Typography';
import { Color } from '@/styles/GlobalStyles';
import Icon from 'react-native-vector-icons/Ionicons';




import { useRouter, useLocalSearchParams } from 'expo-router';

const QuantityControl = ({ quantity, onIncrease, onDecrease }) => {
  if (quantity === 0) {
    return (
      <TouchableOpacity style={styles.addButton} onPress={onIncrease}>
        <Icon name="add" size={16} color="#fff" />
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.quantityContainer}>
      <TouchableOpacity style={styles.quantityButton} onPress={onDecrease}>
        <Icon name="remove" size={16} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.quantityText}>{quantity}</Text>
      <TouchableOpacity style={styles.quantityButton} onPress={onIncrease}>
        <Icon name="add" size={16} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const renderFoodCard = (item, quantity, onUpdateQuantity) => {
  return (
    <View style={styles.card}>
      {/* Hình ảnh món ăn */}
      <Image 
        source={{ uri: item.image }} 
        style={styles.image} 
        resizeMode="cover"
        defaultSource={require("@/assets/images/image.png")}
      />

      {/* Tên món và mô tả */}
      <Text style={styles.title}>{item.name}</Text>
      <Text numberOfLines={2} style={styles.description}>{item.description}</Text>

      {/* Giá và điều chỉnh số lượng */}
      <View style={styles.footer}>
        <Text style={styles.price}>{item.price.toLocaleString('vi-VN')}đ</Text>
        <QuantityControl 
          quantity={quantity}
          onIncrease={() => onUpdateQuantity(item._id, quantity + 1)}
          onDecrease={() => onUpdateQuantity(item._id, Math.max(0, quantity - 1))}
        />
      </View>
    </View>
  );
};

const CartSummary = ({ totalAmount, onViewCart }) => {
  return (
    <View style={styles.cartSummary}>
      <Text style={styles.totalAmount}>Tạm tính: {totalAmount.toLocaleString('vi-VN')}đ</Text>
      <TouchableOpacity 
        style={[
          styles.viewCartButton,
          totalAmount <= 0 && styles.viewCartButtonDisabled
        ]}
        onPress={onViewCart}
        disabled={totalAmount <= 0}
      >
        <Icon name="cart-outline" size={24} color={totalAmount <= 0 ? Color.gray : "#fff"} />
      </TouchableOpacity>
    </View>
  );
};

const Menu = () => {
  const { getContextFoodList } = useFoodContext();
  const { cartItems, loading, addItemToCart } = useCart();
  const [foodList, setFoodList] = useState([]);
  const [filteredFoodList, setFilteredFoodList] = useState([]);
  const { id: resId } = useLocalSearchParams();

  useEffect(() => {
    const fetchFoodList = async () => {
      const list = await getContextFoodList();
      const foods = list?.foods || [];
      setFoodList(foods);
      
      const restaurantFoods = foods.filter(food => food.restaurantId == resId);
      setFilteredFoodList(restaurantFoods);
    };
    fetchFoodList();
  }, [getContextFoodList, resId]);

  const handleUpdateQuantity = async (foodId, newQuantity) => {
    try {
      const foodItem = filteredFoodList.find(food => food._id === foodId);
      if (!foodItem) return;

      const currentQuantity = cartItems.find(item => item.foodId === foodId)?.quantity || 0;
      const quantityDiff = newQuantity - currentQuantity;
      
      if (quantityDiff !== 0) {
        await addItemToCart(foodId, quantityDiff, foodItem);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update cart. Please try again.');
      console.error('Failed to update cart:', error);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const foodItem = item.food;
      return total + ((foodItem?.price || 0) * item.quantity);
    }, 0);
  };

  const router = useRouter();

  const handleBackPress = () => {
    router.push('/'); //Navigate to home  - bug not working here but fix later
  }

  const handleViewCart = () => {
    router.push('/(app)/cart');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Fixed Header */}
      <View style={styles.headerContainer}>
        <Header title="Menu" hasReturn={true} onPressReturn={handleBackPress}/>
      </View>

      {/* Scrollable Content */}
      <View style={styles.contentContainer}>
        <FlatList
          data={filteredFoodList}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => renderFoodCard(
            item,
            cartItems.find(cartItem => cartItem.foodId === item._id)?.quantity || 0,
            handleUpdateQuantity
          )}
          contentContainerStyle={styles.menuContainer}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No menu items available for this restaurant.</Text>
            </View>
          )}
        />
      </View>

      {/* Fixed Cart Summary */}
      <CartSummary 
        totalAmount={calculateTotal()}
        onViewCart={handleViewCart}
      />
    </SafeAreaView>
  );
};

export default Menu;