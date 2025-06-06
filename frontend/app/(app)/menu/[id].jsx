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
      <Image source={require("@/assets/images/image.png")} style={styles.image} 
             resizeMode="cover" />

      {/* Tên món và địa điểm */}
      <Text style={styles.title}>{item.name}</Text>

      {/* Giá và nút thêm */}
      <View style={styles.footer}>
        <Text style={styles.price}>${item.price}</Text>
        <TouchableOpacity style={styles.addButton}>
          <Icon name="add" size={16} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
    </>
  );
}

const Menu = () => {
  const { getContextFoodList } = useFoodContext(); // Get the food context functions
  // Fetch the food list from context
  const [foodList, setFoodList] = useState([]); // State to hold the food list

  useEffect(() => {
    const fetchFoodList = async () => {
      const list = await getContextFoodList();
      setFoodList(list);
    };
    fetchFoodList();
  }, [getContextFoodList]);
  console.log("Food List:", foodList); // Log the food list for debugging


  const resId = useLocalSearchParams().resId; // Get the restaurant ID from the URL parameters
  const router = useRouter(); // Initialize the router

  const handleBackPress = () => {
    router.back(); // Navigate back to the previous screen
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
          data={foodList}
          keyExtractor={(item) => item._id.toString()} 
          renderItem={({ item }) => (renderFoodCard(item))}
          numColumns={2}
          contentContainerStyle={styles.notiContainer}
        />
      </View>
    </SafeAreaView>
    </>
  )
}

export default Menu;