import * as React from "react";
import { Text, View, Pressable, } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "@/styles/tabs/history";


const History = () => {
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

export default History;