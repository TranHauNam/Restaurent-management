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
} from 'react-native'

import { useFoodContext } from '@/contexts/food-context';
import { foodData } from '@/data/mocking/food';
import { Header } from '@/components/Header';
import { styles } from '@/styles/menu/main';
import { Typography } from '@/styles/Typography';

import Icon from 'react-native-vector-icons/Ionicons';




import { useRouter, useLocalSearchParams } from 'expo-router';

const renderFoodCard = (item) => {
  return (
    <>
      <View style={styles.card}>
      {/* Hình ảnh món ăn */}
      <Image 
        source={{ uri: item.image }} 
        style={styles.image} 
        resizeMode="cover"
        defaultSource={require("@/assets/images/image.png")} // Fallback image
      />

      {/* Tên món và địa điểm */}
      <Text style={styles.title}>{item.name}</Text>

      {/* Description */}
      <Text numberOfLines={2} style={styles.location}>{item.description}</Text>

      {/* Giá và nút thêm */}
      <View style={styles.footer}>
        <Text style={styles.price}>{item.price.toLocaleString('vi-VN')}đ</Text>
        <TouchableOpacity style={styles.addButton}>
          <Icon name="add" size={16} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
    </>
  );
}

const Menu = () => {
  const { getContextFoodList } = useFoodContext();
  const [foodList, setFoodList] = useState([]); // State to hold the food list
  const [filteredFoodList, setFilteredFoodList] = useState([]); // State to hold filtered foods
  const { id: resId } = useLocalSearchParams(); // Get the restaurant ID from the URL parameters

  useEffect(() => {
    const fetchFoodList = async () => {
      const list = await getContextFoodList();
      const foods = list?.foods || [];
      setFoodList(foods);
      
      // Filter foods for this restaurant
      const restaurantFoods = foods.filter(food => food.restaurantId == resId);
      setFilteredFoodList(restaurantFoods);
    };
    fetchFoodList();
  }, [getContextFoodList, resId]);

  const router = useRouter();

  const handleBackPress = () => {
    router.back();
  }

  return (
    <>
    <StatusBar barStyle="dark-content" backgroundColor="#fff" />
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header title="Menu" hasReturn={true} onPressReturn={handleBackPress}/>

      {/* Scroll View */}
      <View style={styles.notiLayout}>
        <FlatList
          data={filteredFoodList}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => renderFoodCard(item)}
          numColumns={2}
          contentContainerStyle={styles.notiContainer}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No menu items available for this restaurant.</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
    </>
  )
}

export default Menu;