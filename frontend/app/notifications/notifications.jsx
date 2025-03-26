import * as React from "react";
import { Text, StyleSheet, View, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize } from "@/styles/GlobalStyles";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

const Notifications = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image
            style={styles.icon}
            source={require("@/assets/images/image.png")}
          />
        </Pressable>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      {/* Notification Items */}
      <View style={styles.notificationItem}>
        <Text style={styles.restaurantName}>Sea Grill of Merrick Park</Text>
        <Text style={styles.notificationMessage}>Your Table is Booked</Text>
        <Text style={styles.timeAgo}>2 hrs ago</Text>
        <View style={styles.notificationLine} />
      </View>

      <View style={styles.notificationItem}>
        <Text style={styles.restaurantName}>Sea Grill of Merrick Park</Text>
        <Text style={styles.notificationMessage}>Your Table is Booked</Text>
        <Text style={styles.timeAgo}>10 hrs ago</Text>
        <View style={styles.notificationLine} />
      </View>

      <View style={styles.notificationItem}>
        <Text style={styles.restaurantName}>Sea Grill of Merrick Park</Text>
        <Text style={styles.notificationMessage}>
          Thank you for visiting, please come again
        </Text>
        <Text style={styles.timeAgo}>3 days ago</Text>
        <View style={styles.notificationLine} />
      </View>

      <View style={styles.notificationItem}>
        <Text style={styles.restaurantName}>Sea Grill of Merrick Park</Text>
        <Text style={styles.notificationMessage}>
          Your booking has been canceled
        </Text>
        <Text style={styles.timeAgo}>3 days ago</Text>
        <View style={styles.notificationLine} />
      </View>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <Pressable style={styles.footerItem}>
          <Ionicons name="home-outline" size={24} color={Color.sub} />
          <Text style={styles.footerText}>Home</Text>
        </Pressable>
        <Pressable style={styles.footerItem}>
          <Ionicons name="notifications-outline" size={24} color={Color.primary} />
          <Text style={[styles.footerText, styles.activeFooterText]}>Notifications</Text>
        </Pressable>
        <Pressable style={styles.footerItem}>
          <MaterialIcons name="history" size={24} color={Color.sub} />
          <Text style={styles.footerText}>History</Text>
        </Pressable>
        <Pressable style={styles.footerItem}>
          <FontAwesome5 name="ellipsis-h" size={24} color={Color.sub} />
          <Text style={styles.footerText}>More</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    paddingHorizontal: wp("4%"),
    paddingTop: hp("2%"),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp("2%"),
  },
  backButton: {
    marginRight: wp("2%"),
  },
  icon: {
    width: wp("5%"),
    height: hp("2.5%"),
  },
  headerTitle: {
    fontSize: wp("5%"),
    fontFamily: FontFamily.segoeUI,
    fontWeight: "700",
    color: Color.secondary,
  },
  notificationItem: {
    paddingVertical: hp("2%"),
    borderBottomWidth: 1,
    borderBottomColor: Color.sub,
    position: "relative",
  },
  restaurantName: {
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.segoeUI,
    fontWeight: "700",
    color: Color.tertiary,
    marginBottom: hp("0.5%"),
  },
  notificationMessage: {
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.segoeUI,
    color: Color.tertiary,
    marginBottom: hp("0.5%"),
  },
  timeAgo: {
    fontSize: FontSize.size_3xs,
    fontFamily: FontFamily.segoeUI,
    color: Color.tertiary,
    textAlign: "right",
  },
  notificationLine: {
    height: 2,
    backgroundColor: Color.primary,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: hp("2%"),
    borderTopWidth: 1,
    borderTopColor: Color.sub,
  },
  footerItem: {
    alignItems: "center",
  },
  footerText: {
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.segoeUI,
    color: Color.sub,
    marginTop: hp("0.5%"),
  },
  activeFooterText: {
    color: Color.primary,
  },
});

export default Notifications;