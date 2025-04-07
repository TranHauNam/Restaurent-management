import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator, Pressable } from "react-native";
import { useRoute } from "@react-navigation/native"; // Get route params
import { Color, FontFamily, FontSize, Border } from "@/styles/GlobalStyles";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const SingleRestaurant = () => {
  const route = useRoute();
  const { id } = route.params; // Get restaurant ID from route params
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching restaurant data
    const fetchRestaurant = async () => {
      setLoading(true);
      // Replace this with your API call
      const data = {
        id,
        name: "Sea Grill North Miami Beach",
        address: "3913 NE 163rd St North Miami Beach, FL 33160",
        hours: "10:30 AM - 11:00 PM",
        description:
          "Seagrill Restaurant and bar has one mission: to provide guests with a fine and fresh seafood experience.",
        image: require("@/assets/images/image.png"),
      };
      setRestaurant(data);
      setLoading(false);
    };

    fetchRestaurant();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Color.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.restaurantTitle}>{restaurant.name}</Text>
      <View style={styles.headerLine} />

      {/* Restaurant Image */}
      <Image style={styles.restaurantImage} source={restaurant.image} />

      {/* Address and Time */}
      <Text style={styles.address}>{restaurant.address}</Text>
      <Text style={styles.operatingHours}>{restaurant.hours}</Text>

      {/* Menu and Description */}
      <Text style={styles.menuLink}>Show Menu</Text>
      <Text style={styles.sectionTitle}>Description</Text>
      <Text style={styles.description}>
        {restaurant.description}
        <Text style={styles.readMore}> Read More...</Text>
      </Text>

      {/* Booking Options */}
      <View style={styles.bookingOptions}>
        <View style={styles.bookingOption}>
          <Text style={styles.bookingOptionText}>Date</Text>
        </View>
        <View style={styles.bookingOption}>
          <Text style={styles.bookingOptionText}>Time</Text>
        </View>
        <View style={styles.bookingOption}>
          <Text style={styles.bookingOptionText}>People</Text>
        </View>
      </View>

      {/* Find Slots Button */}
      <Pressable style={styles.findSlotsButton}>
        <Text style={styles.findSlotsText}>Find Slots</Text>
      </Pressable>
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  restaurantTitle: {
    fontSize: wp("5%"),
    color: Color.secondary,
    fontFamily: FontFamily.segoeUI,
    fontWeight: "700",
    marginBottom: hp("2%"),
  },
  headerLine: {
    height: 1,
    backgroundColor: Color.primary,
    marginBottom: hp("4%"),
  },
  restaurantImage: {
    width: "100%",
    height: hp("22%"),
    borderRadius: Border.br_8xs,
    marginBottom: hp("2%"),
  },
  address: {
    fontSize: FontSize.size_xs,
    color: Color.tertiary,
    fontFamily: FontFamily.segoeUI,
    marginBottom: hp("1%"),
  },
  operatingHours: {
    fontSize: FontSize.size_xs,
    color: Color.tertiary,
    fontFamily: FontFamily.segoeUI,
    marginBottom: hp("2%"),
  },
  menuLink: {
    fontSize: FontSize.size_xs,
    color: Color.primary,
    textDecorationLine: "underline",
    marginBottom: hp("4%"),
  },
  sectionTitle: {
    fontSize: FontSize.size_sm,
    color: Color.primary,
    fontFamily: FontFamily.segoeUI,
    fontWeight: "700",
    marginBottom: hp("1%"),
  },
  description: {
    fontSize: FontSize.size_xs,
    color: Color.tertiary,
    fontFamily: FontFamily.segoeUI,
    marginBottom: hp("4%"),
  },
  readMore: {
    color: Color.primary,
    textDecorationLine: "underline",
  },
  bookingOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: hp("4%"),
  },
  bookingOption: {
    flex: 1,
    alignItems: "center",
    paddingVertical: hp("1%"),
    borderWidth: 1,
    borderColor: Color.sub,
    borderRadius: Border.br_8xs,
    marginHorizontal: wp("1%"),
  },
  bookingOptionText: {
    fontSize: FontSize.size_xs,
    color: Color.tertiary,
    fontFamily: FontFamily.segoeUI,
  },
  findSlotsButton: {
    backgroundColor: Color.primary,
    paddingVertical: hp("1.5%"),
    borderRadius: Border.br_8xs,
    alignItems: "center",
  },
  findSlotsText: {
    fontSize: FontSize.size_sm,
    color: Color.white,
    fontFamily: FontFamily.segoeUI,
    fontWeight: "700",
  },
});

export default SingleRestaurant;