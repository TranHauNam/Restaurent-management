import * as React from "react";
import { Text, StyleSheet, View, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontSize, FontFamily } from "@/styles/GlobalStyles";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const History = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.headerTitle}>History</Text>
      <View style={styles.headerLine} />

      {/* Booking Items */}
      <View style={styles.bookingItem}>
        <Text style={styles.restaurantName}>Sea Grill of Merrick Park</Text>
        <Text style={[styles.status, styles.reservedStatus]}>Reserved</Text>
        <Pressable style={styles.actionButton} onPress={() => {}}>
          <Text style={[styles.actionText, styles.cancelText]}>Cancel Booking</Text>
        </Pressable>
        <Pressable style={styles.actionButton} onPress={() => {}}>
          <Text style={[styles.actionText, styles.editText]}>Edit Booking</Text>
        </Pressable>
        <Text style={styles.timeAgo}>2 hrs ago</Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsText}>17 December 2022 | 12:15 PM</Text>
          <Text style={styles.detailsText}>2 Guests</Text>
        </View>
      </View>

      <View style={styles.bookingItem}>
        <Text style={styles.restaurantName}>Sea Grill of Merrick Park</Text>
        <Text style={[styles.status, styles.cancelledStatus]}>Cancelled</Text>
        <Text style={styles.timeAgo}>2 Days ago</Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsText}>17 December 2022 | 12:15 PM</Text>
          <Text style={styles.detailsText}>2 Guests</Text>
        </View>
      </View>

      <View style={styles.bookingItem}>
        <Text style={styles.restaurantName}>Sea Grill of Merrick Park</Text>
        <Text style={[styles.status, styles.completedStatus]}>Completed</Text>
        <Text style={styles.timeAgo}>10 Days ago</Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsText}>17 December 2022 | 12:15 PM</Text>
          <Text style={styles.detailsText}>2 Guests</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    paddingHorizontal: wp("8%"),
    paddingTop: hp("6%"),
  },
  headerTitle: {
    fontSize: wp("4.27%"),
    color: Color.secondary,
    fontFamily: FontFamily.segoeUI,
    fontWeight: "700",
    marginBottom: hp("2%"),
  },
  headerLine: {
    height: 1,
    backgroundColor: Color.primary,
    marginBottom: hp("2%"),
  },
  bookingItem: {
    backgroundColor: Color.white,
    paddingVertical: hp("2%"),
    borderBottomWidth: 1,
    borderBottomColor: Color.sub,
    marginBottom: hp("2%"),
  },
  restaurantName: {
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.segoeUI,
    fontWeight: "700",
    color: Color.tertiary,
    marginBottom: hp("0.5%"),
  },
  status: {
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.segoeUI,
    marginBottom: hp("1%"),
  },
  reservedStatus: {
    color: Color.primary,
  },
  cancelledStatus: {
    color: Color.colorCrimson,
  },
  completedStatus: {
    color: "#00a144",
  },
  actionButton: {
    marginBottom: hp("0.5%"),
  },
  actionText: {
    fontSize: FontSize.size_3xs,
    fontFamily: FontFamily.segoeUI,
    textDecorationLine: "underline",
  },
  cancelText: {
    color: Color.colorCrimson,
  },
  editText: {
    color: "#00a144",
  },
  timeAgo: {
    fontSize: FontSize.size_3xs,
    fontFamily: FontFamily.segoeUI,
    color: Color.tertiary,
    textAlign: "right",
    marginBottom: hp("1%"),
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailsText: {
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.segoeUI,
    color: Color.tertiary,
  },
});

export default History;