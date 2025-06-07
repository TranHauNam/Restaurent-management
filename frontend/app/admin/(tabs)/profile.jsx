import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthContext } from '../../../contexts/auth-context';
import { API_URL } from '../../../services/config';
import { Color, FontFamily, FontSize, Border } from '../../../styles/GlobalStyles';
import { FontAwesome } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function Profile() {
  const router = useRouter();
  const { adminToken, logout } = useAuthContext();
  const [profile, setProfile] = useState({
    username: 'Trần Hậu Nam',
    email: 'admin@gmail.com',
    phone: '0347453231',
    gender: 'Nam',
    dob: '2004-12-31',
    avatar: null,
  });
  const [loading, setLoading] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [pendingLogout, setPendingLogout] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/admin/profile`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      const data = await res.json();
    //   if (data.admin) setProfile(data.admin);
    } catch (err) {
      // Nếu lỗi, giữ nguyên mock data
    }
    setLoading(false);
  };

  const handleLogout = () => {
    router.replace('/admin/sign-in');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <FontAwesome name="user" size={22} color={Color.primary} style={styles.headerIcon} />
            <Text style={styles.title}>Thông tin cá nhân</Text>
          </View>
          <Text style={styles.subtitle}>Xem thông tin tài khoản của bạn</Text>
        </View>

        {/* Avatar */}
        <View style={styles.avatarBox}>
          <Image
            source={profile?.avatar ? { uri: profile.avatar } : require('../../../assets/download.jpeg')}
            style={styles.avatar}
          />
        </View>
        {/* Thông tin cá nhân */}
        <View style={styles.infoBox}>
          <InfoRow icon="user" label="Tên đăng nhập" value={profile.username || ''} />
          <InfoRow icon="envelope" label="Email" value={profile.email || ''} />
          <InfoRow icon="phone" label="Số điện thoại" value={profile.phone || ''} />
          <InfoRow icon="venus-mars" label="Giới tính" value={profile.gender || ''} />
          <InfoRow icon="birthday-cake" label="Ngày sinh" value={profile.dob ? new Date(profile.dob).toLocaleDateString() : ''} />
        </View>
        {/* Đăng xuất */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <FontAwesome name="sign-out" size={18} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <View style={styles.infoRow}>
      <FontAwesome name={icon} size={18} color={Color.primary} style={{ width: 28 }} />
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Color.white,
  },
  container: {
    flex: 1,
  },
  header: {
    padding: wp('5%'),
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  headerIcon: {
    marginRight: wp('2%'),
    marginTop: 2,
  },
  title: {
    fontSize: wp('5.5%'),
    color: Color.primary,
    fontFamily: FontFamily.segoeUI,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: wp('4%'),
    color: Color.sub,
    fontFamily: FontFamily.segoeUI,
    marginLeft: wp('0.5%'),
    marginTop: hp('0.5%'),
  },
  backBtn: {
    marginRight: 12,
    padding: 4,
  },
  avatarBox: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Color.lightsub,
    borderWidth: 2,
    borderColor: Color.primary,
  },
  infoBox: {
    backgroundColor: Color.lightsub,
    borderRadius: 12,
    marginHorizontal: 16,
    padding: 16,
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  infoLabel: {
    width: 110,
    color: Color.secondary,
    fontSize: 15,
    fontFamily: FontFamily.segoeUI,
  },
  infoValue: {
    flex: 1,
    color: Color.tertiary,
    fontSize: 15,
    fontFamily: FontFamily.segoeUI,
    textAlign: 'right',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.primary,
    borderRadius: 8,
    marginHorizontal: 32,
    paddingVertical: 14,
    justifyContent: 'center',
    marginTop: 12,
    elevation: 2,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: FontFamily.segoeUI,
  }
}); 