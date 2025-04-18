import React from "react";
import { StyleSheet, View, Text, Pressable, Image, FlatList, } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Color, FontFamily, Border, FontSize } from "@/styles/GlobalStyles";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import { fetchRestaurants } from "@/services/api";

const restaurants = [
  {
    id: "1",
    name: "Sea Grill of Merrick Park",
    address: "4250 Salzedo Street, Suite 1425 Coral Gables, FL 33146",
    hours: "11:30 AM - 11:00 PM",
    image: require("@/assets/images/image.png"),
  },
  {
    id: "2",
    name: "Sea Grill North Miami Beach",
    address: "3913 NE 163rd St North Miami Beach, FL 33160",
    hours: "11:30 AM - 11:00 PM",
    image: require("@/assets/images/image.png"),
  },
  {
    id: "3",
    name: "Villagio Restaurant and Bar",
    address: "344 Plaza Real, Suite 1433 Boca Raton, FL 33432-3937",
    hours: "11:30 AM - 11:00 PM",
    image: require("@/assets/images/image.png"),
  },
  {
    id: "4",
    name: "Villagio Restaurant and Bar",
    address: "1760 Sawgrass Mills Circle Sunrise, FL 33323-3912",
    hours: "11:30 AM - 11:00 PM",
    image: require("@/assets/images/image.png"),
  },
  {
    id: "5",
    name: "Carpaccio American Dream",
    address: "1 American Dream Way. #F225 East Rutherford, NJ 07073",
    hours: "11:30 AM - 11:00 PM",
    image: require("@/assets/images/image.png"),
  },
];

const HomeGridView = () => {
  const [restaurantData, setRestaurantData] = useState([]);

  useEffect(() => {
    fetchRestaurants().then((data) => {
      setRestaurantData(data);
      console.log("Fetched restaurants:", restaurantData);
    }).catch((error) => {
      console.error("Error fetching restaurants:", error);
    });
  }, []);

  // Add this useEffect to log the updated restaurantData
  useEffect(() => {
    console.log("Updated restaurantData:", restaurantData);
  }, [restaurantData]);

  
  const renderRestaurantCard = ({ item }) => (
    // <View style={styles.card}>
    //   <Image style={styles.cardImage} source={item.image} />
    //   <Text style={styles.cardTitle}>{item.name}</Text>
    //   <Text style={styles.cardAddress}>{item.address}</Text>
    //   <Text style={styles.cardHours}>{item.hours}</Text>
    //   <View style={styles.timeSlots}>
    //     <Pressable style={styles.timeSlot}>
    //       <Text style={styles.timeSlotText}>11:15</Text>
    //     </Pressable>
    //     <Pressable style={styles.timeSlot}>
    //       <Text style={styles.timeSlotText}>11:15</Text>
    //     </Pressable>
    //     <Pressable style={styles.timeSlot}>
    //       <Text style={styles.timeSlotText}>11:15</Text>
    //     </Pressable>
    //   </View>
    // </View>

    <Pressable
      style={styles.card}
      onPress={() => {
        router.navigate(`/restaurants/${item.id}`); // Navigate to restaurant details
      }}
    >
      <Image style={styles.cardImage} source={item.image} />
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardAddress}>{item.address}</Text>
      <Text style={styles.cardHours}>{item.hours}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
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
      <FlatList
        data={restaurants}
        renderItem={renderRestaurantCard}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={styles.columnWrapper}
      />
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
    backgroundColor: Color.white,
    borderRadius: Border.br_8xs,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
    width: wp("45%"),
    padding: wp("2%"),
  },
  cardImage: {
    width: "100%",
    height: hp("15%"),
    borderRadius: Border.br_8xs,
    marginBottom: hp("1%"),
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