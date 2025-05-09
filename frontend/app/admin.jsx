import React, { useEffect } from "react";
import { StyleSheet, View, Text, Pressable, Alert } from "react-native";
import { Color, FontFamily, FontSize } from "@/styles/GlobalStyles";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useRouter } from "expo-router";
import { useAuthContext } from "@/contexts/auth-context";

const AdminDashboard = () => {
  const router = useRouter();
  const { logout, user, isAdmin } = useAuthContext();

  useEffect(() => {
    if (!isAdmin) {
      Alert.alert("Thông báo", "Bạn không có quyền truy cập trang này", [
        {
          text: "OK",
          onPress: () => router.replace("/sign-in")
        }
      ]);
    }
  }, [isAdmin]);

  const handleLogout = async () => {
    await logout();
    router.replace("/sign-in");
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Bảng điều khiển Admin</Text>
      <View style={styles.headerLine} />

      <View style={styles.infoSection}>
        <Text style={styles.infoText}>ID Nhà hàng: {user?.restaurantId}</Text>
      </View>

      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Đăng xuất</Text>
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
  infoSection: {
    marginBottom: hp("4%"),
  },
  infoText: {
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.segoeUI,
    color: Color.secondary,
    marginBottom: hp("1%"),
  },
  logoutButton: {
    backgroundColor: Color.primary,
    paddingVertical: hp("1.5%"),
    paddingHorizontal: wp("8%"),
    borderRadius: wp("2%"),
    alignSelf: "center",
    marginTop: hp("4%"),
  },
  logoutText: {
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.segoeUI,
    color: Color.white,
    textAlign: "center",
  },
});

export default AdminDashboard; 