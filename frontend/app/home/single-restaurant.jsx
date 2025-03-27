import * as React from "react";
import { Text, StyleSheet, View, Pressable, Image } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { FontFamily, Color, FontSize, Border } from "@/styles/GlobalStyles";

const SingleRestaurantPage = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.restaurantTitle}>Sea Grill North Miami Beach</Text>
      <View style={styles.headerLine} />

      {/* Restaurant Image */}
      <Image
        style={styles.restaurantImage}
        source={require("@/assets/images/image.png")}
      />

      {/* Address and Time */}
      <Text style={styles.address}>
        3913 NE 163rd St{"\n"}North Miami Beach, FL 33160
      </Text>
      <Text style={styles.operatingHours}>
        10:30 AM - 11:00 PM
      </Text>

      {/* Menu and Description */}
      <Text style={styles.menuLink}>Show Menu</Text>
      <Text style={styles.sectionTitle}>Description</Text>
      <Text style={styles.description}>
        Seagrill Restaurant and bar has one mission: to provide guests with a fine and fresh seafood experience. Featuring seasonal and sustainable seafood that is flown in fresh daily, our chef-driven menu proves that no matter when you’re dining, seafood can be truly exceptional.
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

export default SingleRestaurantPage;