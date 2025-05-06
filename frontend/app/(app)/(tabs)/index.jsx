import React from "react";
import { StyleSheet, View, Text, Pressable, Image, FlatList, } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Color, FontFamily, Border, FontSize } from "@/styles/GlobalStyles";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import { fetchRestaurants } from "@/services/api";
import Entypo from '@expo/vector-icons/Entypo';
import { StatusBar } from "expo-status-bar";

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

const HomeGridView = () => {
  const [restaurantData, setRestaurantData] = useState([]);

  useEffect(() => {
    fetchRestaurants().then((data) => {
      setRestaurantData(data.restaurents);
      console.log("Fetched restaurants:", restaurantData);
    }).catch((error) => {
      console.error("Error fetching restaurants:", error);
    });
  }, []);

  // useEffect(() => {
  //   console.log("Restaurant data time available updated:", restaurantData.availableTimes);
  // }, [restaurantData]);

  
  const renderRestaurantCard = ({ item }) => (
    <View style={{
      marginBottom: hp("2%"),
      minWidth: "100%",
      height: hp("20%"),


      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "baseline",
      
    }}>
      <Pressable
        style={{
          
          minWidth: "100%",
          height: "50%",    
          
          

          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
        onPress={() => {
          router.navigate(`/restaurants/${item._id}`); // Navigate to restaurant details
        }}
      >
        <Image style={{
          width: wp("20%"),
          height: hp("10%"),

          borderRadius: 10,
          
        }}
        source={{uri : `${item.imageUrl}`}}/>

        <View style={{
          
          minWidth: "70%",


          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: 2,
        }}>
          <Text style={{
            fontSize: FontSize.size_lg,
            fontWeight: "700",
          }}>{item.name}</Text>
          <View style={{

            display: "flex",
            flexDirection: "row",
            gap: 4,
          }}>

            <Entypo name="location-pin" size={22} color="black" />  
            <Text>{item.address}</Text>

          </View>

        </View>
      </Pressable>
      <FlatList
        data={item.availableTimes}
        renderItem={({ item }) => (
          
          <View style={{
            marginHorizontal: wp("3%"),
            width: wp("18%"),
            minHeight: "50%",

            backgroundColor: Color.primary,
            borderRadius: 4,

            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            
          }}>
            <Text style={{
              fontSize: FontSize.size_sm,
              fontWeight: "700",
              color: Color.white,
              textAlign: "center",
            }}>{item}</Text>
          </View>
        )}
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
      <StatusBar style="dark" backgroundColor={Color.white} />
      {/* Header */}
      <LinearGradient
        style={styles.headerBanner}
        colors={["#faff00", "#ed994c"]}
      >
        <Text style={styles.headerText}>
          Sign up for an account to receive 2% off your bill on every reservation!
        </Text>
      </LinearGradient>
      <Text style={styles.welcomeText}>
        Welcome to <Text style={styles.highlightText}>Dine-in Florida</Text>
      </Text>
      <Text style={styles.sectionTitle}>Our Restaurants</Text>

       {/* Restaurant List */}
      <View style={{
        width: "100%",
        height: "100%", 
        flexDirection: "column",

        display: "flex",
        justifyContent: "flex-start",
        alignItems: "baseline",
        
        
      }}> 
        <FlatList
          data={restaurantData}
          renderItem={renderRestaurantCard}
          keyExtractor={(item) => item.id}
          numColumns={1}
          contentContainerStyle={styles.listContainer}
          
        />

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    
    paddingHorizontal: wp("4%"),
    paddingTop: hp("6%"),
  },
  headerBanner: {
    paddingVertical: hp("2%"),
    paddingHorizontal: wp("4%"),
    borderRadius: Border.br_8xs,
    marginBottom: hp("4%"),
  },
  headerText: {
    color: Color.white,
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.segoeUI,
    fontWeight: "700",
    textAlign: "center",
  },
  welcomeText: {
    fontSize: wp("4.5%"),
    fontFamily: FontFamily.segoeUI,
    fontWeight: "700",
    color: Color.secondary,
    marginBottom: hp("2%"),
  },
  highlightText: {
    color: Color.primary,
  },
  sectionTitle: {
    fontSize: wp("4.5%"),
    fontFamily: FontFamily.segoeUI,
    fontWeight: "700",
    color: Color.primary,
    marginBottom: hp("2%"),
  },
  listContainer: {
    paddingBottom: hp("4%"),
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: hp("2%"),
  },
  card: {
    width: "90%",
    height: hp("20%"),
  },
  cardImage: {
    width: "100%",
    height: hp("15%"),
    
  },
  cardTitle: {
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.segoeUI,
    fontWeight: "700",
    color: Color.secondary,
    marginBottom: hp("0.5%"),
  },
  cardAddress: {
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.segoeUI,
    color: Color.tertiary,
    marginBottom: hp("0.5%"),
  },
  cardHours: {
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.segoeUI,
    color: Color.tertiary,
    marginBottom: hp("1%"),
  },
  timeSlots: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeSlot: {
    backgroundColor: Color.primary,
    borderRadius: Border.br_8xs,
    paddingVertical: hp("0.5%"),
    paddingHorizontal: wp("2%"),
  },
  timeSlotText: {
    fontSize: FontSize.size_3xs,
    fontFamily: FontFamily.segoeUI,
    color: Color.white,
    textAlign: "center",
  },
});

export default HomeGridView;