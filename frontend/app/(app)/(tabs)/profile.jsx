import * as React from "react";
import { Text, View, Pressable, Image, Alert } from "react-native";
import { useAuthContext } from "@/contexts/auth-context"; // Import AuthContext
import { router, useRouter } from "expo-router"; // Import useRouter for navigation
import { styles } from "@/styles/tabs/profile"; // Import styles for the component

const Profile = () => {
  const { logout } = useAuthContext(); // Destructure logout function from AuthContext
  const handleLogout = async () => {
    await logout();
    router.replace("/");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.headerTitle}>Your Profile</Text>
      <View style={styles.headerLine} />

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          style={styles.profileImage}
          source={require("@/assets/images/image.png")}
        />
        <Text style={styles.profileName}>Thanh Nguyen</Text>
        <Text style={styles.editProfile}>Edit Profile</Text>
        <Text style={styles.contactInfo}>+84 68688888</Text>
        <Text style={styles.contactInfo}>it.nguyenducthanh@gmail.com</Text>
      </View>

      {/* Savings Section */}
      <View style={styles.savingsSection}>
        <Text style={styles.savingsTitle}>
          <Text style={styles.savingsLabel}>Your </Text>
          <Text style={styles.savingsHighlight}>Savings</Text>
        </Text>
        <Text style={styles.savingsSubtitle}>on your recent Bookings</Text>
        <View style={styles.savingsAmountContainer}>
          <Text style={styles.savingsAmount}>
            <Text style={styles.amount}>20</Text>
            <Text style={styles.currency}> Dollars</Text>
          </Text>
        </View>
      </View>

      {/* Logout Button */}
      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>LogOut</Text>
      </Pressable>
    </View>
  );
};



export default Profile;