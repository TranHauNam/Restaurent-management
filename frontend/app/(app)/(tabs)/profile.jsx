import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

import { useAuthContext } from "@/contexts/auth-context"; // Import AuthContext
import { styles } from "@/styles/tabs/profile"; // Import styles for the component
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Color } from "@/styles/GlobalStyles"; // Import global styles
import { Typography } from "@/styles/Typography"; // Import typography styles

import { router, useRouter } from "expo-router"; // Import useRouter for navigation
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar"


// Component render menu item
const renderMenuItem = (icon, label, onPress) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuLeft}>
      <View style={styles.menuIconBox}>
        <Icon name={icon} size={20} color="#000" />
      </View>
      <Text style={[Typography.paragraph, styles.menuLabel]}>{label}</Text>
    </View>
    <Icon name="chevron-right" size={24} color="#aaa" />
  </TouchableOpacity>
);

const Profile = () => {
  const { logout } = useAuthContext(); // Destructure logout function from AuthContext
  const handleLogout = async () => {
    await logout();
    router.replace("/sign-in");
    // console.log("Logout function called");
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.support}>
          <Icon name="phone-outline" size={20} color="#000" />
          <Text style={[Typography.header6, styles.supportText]}>Hỗ trợ</Text>
        </TouchableOpacity>
      </View>

      {/* Avatar & Tên */}
      <View style={styles.avatarSection}>
        <Avatar size="lg">
          <AvatarFallbackText>Nguyen Thanh</AvatarFallbackText>
          <AvatarImage
            // source={{
            //   uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            // }}
          />
          <AvatarBadge />
        </Avatar>
        <Text style={styles.name}>NGUYEN THANH</Text>
        <Text style={styles.customerCode}>Mã KH: 06155044</Text>
      </View>
      

      {/* Level + Ví ưu đãi */}
      {/* <View style={styles.levelSection}>
        <View style={styles.levelItem}>
          <Icon name="crown-outline" size={20} color="#000" />
          <Text style={styles.levelText}>Silver</Text>
        </View>
        <View style={styles.levelItem}>
          <Icon name="wallet-giftcard" size={20} color="#000" />
          <Text style={styles.levelText}>Ví ưu đãi</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>0</Text>
          </View>
        </View>
      </View> */}

      {/* Menu */}
      <View style={styles.menuSection}>
        {renderMenuItem('account-outline', 'Thông tin cá nhân')}
        {/* {renderMenuItem('history', 'Lịch sử hoạt động')} */}
        {renderMenuItem('map-marker-outline', 'Quản lý địa chỉ')}
        {renderMenuItem('logout', 'Đăng xuất', handleLogout)}
        {/* {renderMenuItem('file-document-outline', 'Quản lý thông tin xuất hoá đơn')} */}
        {renderMenuItem('file-document', 'Điều khoản sử dụng')}
        {/* {renderMenuItem('account-group-outline', 'Giới thiệu bạn bè')} */}
        {renderMenuItem('information-outline', 'Về TableBooking')}


      </View>

      <View style={styles.versionSection}>
        <Text style={[Typography.label, styles.versionText]}>
          Phiên bản ứng dụng: 1.0.0
        </Text>
      </View>
    </ScrollView>
  );
};



export default Profile;