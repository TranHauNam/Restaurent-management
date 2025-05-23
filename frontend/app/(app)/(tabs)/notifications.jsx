import * as React from "react";
import { Text, View, Pressable, Image } from "react-native";
import { styles } from "@/styles/tabs/notifications";
import { useNavigation } from "@react-navigation/native";


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
    </View>
  );
};



export default Notifications;