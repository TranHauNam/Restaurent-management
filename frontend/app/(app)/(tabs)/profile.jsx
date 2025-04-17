import * as React from "react";
import { Text, StyleSheet, View, Pressable, Image, Alert } from "react-native";
import { FontFamily, FontSize, Color } from "@/styles/GlobalStyles";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useAuthContext } from "@/contexts/auth-context"; // Import AuthContext
import { router, useRouter } from "expo-router"; // Import useRouter for navigation

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    paddingHorizontal: wp("8%"),
    paddingTop: hp("6%"),
  },
  headerTitle: {
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
  profileSection: {
    alignItems: "center",
    marginBottom: hp("6%"),
  },
  profileImage: {
    width: wp("20%"),
    height: wp("20%"),
    borderRadius: wp("10%"),
    marginBottom: hp("2%"),
  },
  profileName: {
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.segoeUI,
    fontWeight: "700",
    color: Color.primary,
    marginBottom: hp("1%"),
  },
  editProfile: {
    fontSize: FontSize.size_3xs,
    color: Color.primary,
    textDecorationLine: "underline",
    marginBottom: hp("2%"),
  },
  contactInfo: {
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.segoeUI,
    color: Color.tertiary,
    marginBottom: hp("1%"),
  },
  savingsSection: {
    alignItems: "center",
    marginBottom: hp("6%"),
  },
  savingsTitle: {
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.segoeUI,
    marginBottom: hp("1%"),
  },
  savingsLabel: {
    color: Color.tertiary,
  },
  savingsHighlight: {
    color: Color.colorOrange,
  },
  savingsSubtitle: {
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.segoeUI,
    color: Color.tertiary,
    marginBottom: hp("2%"),
  },
  savingsAmountContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.11)",
    paddingVertical: hp("1%"),
    paddingHorizontal: wp("4%"),
    borderRadius: wp("2%"),
  },
  savingsAmount: {
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.poppinsBold,
    color: Color.primary,
  },
  amount: {
    fontSize: wp("5%"),
  },
  currency: {
    fontSize: wp("4%"),
  },
  logoutButton: {
    backgroundColor: Color.primary,
    paddingVertical: hp("1.5%"),
    paddingHorizontal: wp("8%"),
    borderRadius: wp("2%"),
    alignSelf: "center",
  },
  logoutText: {
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.segoeUI,
    color: Color.white,
    textAlign: "center",
  },
});

export default Profile;