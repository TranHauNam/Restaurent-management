import React from "react";
import { useState, useEffect, useRef } from "react";
import {  View, Text, Pressable, Image, FlatList, ScrollView, TouchableOpacity, TextInput } from "react-native";

import { useFoodContext } from "@/contexts/food-context";
import { fetchRestaurants } from "@/services/restaurant-api";
import { getFoodList } from "@/services/api/food-api";
import { styles } from "@/styles/tabs/home";
import { Typography } from "@/styles/Typography";

import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';




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
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const { saveContextFoodList, getContextFoodList } = useFoodContext();


  useEffect(() => {
    //fetch restaurants and food list
    fetchRestaurants().then((data) => {
      setRestaurantData(data.restaurents);
      setFilteredRestaurants(data.restaurents);
      // console.log("Fetched restaurants:", restaurantData);
      const fetchFoodList = async () => {
        try {
          const foodList = await getFoodList();
          // console.log("Fetched food list:", foodList);
          foodListRef.current = foodList; // Save to ref for later use

          await saveContextFoodList(foodList);
          // const updatedList = await getContextFoodList();
          // console.log("Updated food list from context:", updatedList); //scussess
        } catch (error) {
          console.error("Error fetching food list:", error);
        }
      };
      fetchFoodList();
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

  // Search filter function
  useEffect(() => {
    const filterRestaurants = () => {
      const query = searchQuery.toLowerCase().trim();
      if (query === '') {
        setFilteredRestaurants(restaurantData);
        return;
      }

      const filtered = restaurantData.filter(restaurant => 
        restaurant.name.toLowerCase().includes(query) ||
        restaurant.address.toLowerCase().includes(query)
      );
      setFilteredRestaurants(filtered);
    };

    filterRestaurants();
  }, [searchQuery, restaurantData]);

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

      {/* Search Bar */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginHorizontal: 16,
        marginVertical: 10,
        height: 45,
      }}>
        <Ionicons name="search" size={20} color="#666" />
        <TextInput
          style={{
            flex: 1,
            marginLeft: 10,
            fontSize: 16,
            color: '#333',
          }}
          placeholder="Search restaurants by name or location"
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
        {searchQuery !== '' && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>

      <Text style={[Typography.header5, styles.sectionTitle]}>Our Restaurants</Text>

      {/* Restaurant List */}
      <View style={styles.restaurantListContainer}> 
        <FlatList
          data={filteredRestaurants}
          renderItem={renderRestaurantCard}
          keyExtractor={(item) => item._id}
          numColumns={1}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={() => (
            <View style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: 20,
            }}>
              <Text style={[Typography.paragraph]}>No restaurants found</Text>
            </View>
          )}
        />

      </View>
      {/* <TouchableOpacity onPress={handleShortToMenu}>
        <Text>Shrt o menu</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default HomeView;