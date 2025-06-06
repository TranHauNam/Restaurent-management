import React from "react";
import { useState, useEffect, useRef } from "react";
import {  View, Text, Pressable, Image, FlatList, ScrollView, TouchableOpacity, } from "react-native";

import { useFoodContext } from "@/contexts/food-context";
import { fetchRestaurants } from "@/services/restaurant-api";
import { getFoodList } from "@/services/api/food-api";
import { styles } from "@/styles/tabs/home";
import { Typography } from "@/styles/Typography";

import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Entypo from '@expo/vector-icons/Entypo';




const Divider = ({ color = "#ccc", thickness = 1, marginVertical = 10 }) => (
  <View
    style={{
      height: thickness,
      backgroundColor: color,
      marginVertical: marginVertical,
      width: "100%",
    }}
  />
);

const HomeView = () => {
  const foodListRef = useRef([]);
  const [restaurantData, setRestaurantData] = useState([]);
  const { saveContextFoodList, getContextFoodList } = useFoodContext();


  useEffect(() => {
    //fetch restaurants and food list
    fetchRestaurants().then((data) => {
      setRestaurantData(data.restaurents);
      // console.log("Fetched restaurants:", restaurantData);
      getFoodList().then((foodList) => {
        console.log("Fetched food list:", foodList);
        saveContextFoodList(foodList);
        foodListRef.current = foodList; // Save to ref for later use
      })
      //debug
      console.log("Food list saved to context:", getContextFoodList());
    }).catch((error) => {
      console.error("Error fetching restaurants:", error);
    });
  }, []);

//   useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const data = await fetchRestaurants();
//       setRestaurantData(data.restaurents);
//       const foodList = await getFoodList(); // Lấy data từ AsyncStorage
//       await saveFoodList(foodList);         // Lưu lại nếu cần
//       foodListRef.current = foodList;       // Lưu vào ref nếu muốn dùng sau
//     } catch (error) {
//       console.error("Error fetching restaurants:", error);
//     }
//   };
//   fetchData();
// }, []);

  const handleShortToMenu = () => {
    router.push({ 
      pathname: `/menu/${"1"}`, 
    });
  }

  // useEffect(() => {
  //   console.log("Restaurant data time available updated:", restaurantData.availableTimes);
  // }, [restaurantData]);
  const renderTimeSlot = (restaurantId) => ({ item }) => (
    <TouchableOpacity 
    style={styles.timeSlotContainer}
    onPress={() => {
      // temp comment out
      router.push({
        pathname: `/restaurant_main/${restaurantId}`,
        params: { time: item }
      })
      
    }}
    >
      <Text style={[Typography.smallButton, styles.timeSlotText]}>{item}</Text>
    </TouchableOpacity>
  );
  
  const renderRestaurantCard = ({ item }) => (
    <View style={styles.cardContainer}>
      <Pressable
        style={styles.cardPressable}
        onPress={() => {
          router.push(`/restaurant_main/${item._id}`); // Navigate to restaurant details
          // router.push(`/menu/${item._id}`); // Navigate to menu
        }}
      >
        <Image style={styles.cardImage}
               source={{uri : `${item.imageUrl}`}}
        />

        <View style={styles.cardAddress}>
          <Text style={[Typography.header5 ,styles.cardTitle]}>{item.name}</Text>
          <View style={{
            display: "flex",
            flexDirection: "row",
            gap: 4,
          }}>

            <Entypo name="location-pin" size={22} color="black" />  
            <Text style={[Typography.paragraph]}>{item.address}</Text>
          </View>
        </View>
      </Pressable>
      <FlatList
        data={item.availableTimes}
        renderItem={renderTimeSlot(item._id)}
        keyExtractor={(slot, index) => `${slot}-${index}`}
        horizontal={true}      
        contentContainerStyle={{
          minWidth: "100%",
        
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      />
      <Divider color="gray" thickness={1} marginVertical={4} />

    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" backgroundColor="white" />

      <Text style={[Typography.header3, styles.welcomeText]}>Welcome to</Text>
      <Text style={[Typography.header2, styles.highlightText]}>Dine-in Florida</Text>
      <Text style={[Typography.header5, styles.sectionTitle]}>Our Restaurants</Text>

       {/* Restaurant List */}
      <View style={styles.restaurantListContainer}> 
        <FlatList
          data={restaurantData}
          renderItem={renderRestaurantCard}
          keyExtractor={(item) => item._id}
          numColumns={1}
          contentContainerStyle={styles.listContainer}   
        />

      </View>
      <TouchableOpacity onPress={handleShortToMenu}>
        <Text>Shrt o menu</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeView;