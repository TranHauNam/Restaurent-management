import React from "react";
import { useState, useEffect } from "react";
import {  View, Text, Pressable, Image, FlatList, } from "react-native";

import { fetchRestaurants } from "@/services/api";
import { styles } from "@/styles/tabs/home";

import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Entypo from '@expo/vector-icons/Entypo';
import { Typography } from "@/styles/Typography";

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
  const [restaurantData, setRestaurantData] = useState([]);

  useEffect(() => {
    fetchRestaurants().then((data) => {
      setRestaurantData(data.restaurents);
      // console.log("Fetched restaurants:", restaurantData);
    }).catch((error) => {
      console.error("Error fetching restaurants:", error);
    });
  }, []);

  // useEffect(() => {
  //   console.log("Restaurant data time available updated:", restaurantData.availableTimes);
  // }, [restaurantData]);
  const renderTimeSlot = ({ item }) => (
    <View style={styles.timeSlotContainer}>
      <Text style={[Typography.smallButton, styles.timeSlotText]}>{item}</Text>
    </View>
  );
  
  const renderRestaurantCard = ({ item }) => (
    <View style={styles.cardContainer}>
      <Pressable
        style={styles.cardPressable}
        onPress={() => {
          router.push(`/restaurant_main/${item._id}`); // Navigate to restaurant details
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
        renderItem={renderTimeSlot}
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
    </View>
  );
};

export default HomeView;