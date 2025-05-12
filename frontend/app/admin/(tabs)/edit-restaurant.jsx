import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Pressable, TextInput, Alert, ScrollView, SafeAreaView } from "react-native";
import { Color, Border, FontSize, FontFamily } from "../../../styles/GlobalStyles";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useRouter } from "expo-router";
import { useAuthContext } from "../../../contexts/auth-context";
import { API_URL } from "../../../services/config";
import { FontAwesome } from '@expo/vector-icons';

const EditRestaurant = () => {
  const router = useRouter();
  const { adminToken, logout } = useAuthContext();
  const [restaurant, setRestaurant] = useState({
    name: "",
    address: "",
    openTime: "",
    closeTime: "",
    description: ""
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      if (!adminToken) {
        Alert.alert("Lỗi", "Phiên đăng nhập đã hết hạn", [
          {
            text: "OK",
            onPress: () => {
              logout();
              router.replace("/admin/sign-in");
            }
          }
        ]);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/api/admin/restaurant/update`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${adminToken}`,
            'Accept': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Restaurant data:", data);

        if (data.restaurant) {
          setRestaurant(prev => ({
            ...prev,
            name: data.restaurant.name || "",
            address: data.restaurant.address || "",
            openTime: data.restaurant.openTime || "",
            closeTime: data.restaurant.closeTime || "",
            description: data.restaurant.description || ""
          }));
        }
      } catch (error) {
        console.error("Error fetching restaurant:", error);
        Alert.alert("Lỗi", "Không thể tải thông tin nhà hàng");
      }
    };

    fetchRestaurantData();
  }, [adminToken]);

  const handleUpdate = async () => {
    if (!adminToken) {
      Alert.alert("Lỗi", "Phiên đăng nhập đã hết hạn", [
        {
          text: "OK",
          onPress: () => {
            logout();
            router.replace("/admin/sign-in");
          }
        }
      ]);
      return;
    }

    if (!restaurant.name || !restaurant.address || !restaurant.openTime || !restaurant.closeTime) {
      Alert.alert("Thông báo", "Vui lòng điền đầy đủ thông tin bắt buộc");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/admin/restaurant/update`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: restaurant.name,
          address: restaurant.address,
          openTime: restaurant.openTime,
          closeTime: restaurant.closeTime,
          description: restaurant.description || ''
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response data:", data);

      if (response.ok) {
        Alert.alert("Thành công", "Cập nhật thông tin nhà hàng thành công");
      } else if (response.status === 401 || response.status === 403) {
        Alert.alert("Lỗi", "Phiên đăng nhập đã hết hạn", [
          {
            text: "OK",
            onPress: () => {
              logout();
              router.replace("/admin/sign-in");
            }
          }
        ]);
      } else {
        Alert.alert("Lỗi", data.message || "Có lỗi xảy ra khi cập nhật");
      }
    } catch (error) {
      console.error("Error updating restaurant:", error);
      Alert.alert("Lỗi", "Có lỗi xảy ra khi cập nhật thông tin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <FontAwesome name="edit" size={24} color={Color.primary} />
            <Text style={styles.title}>Chỉnh sửa thông tin nhà hàng</Text>
          </View>
          <Text style={styles.subtitle}>Cập nhật thông tin cơ bản của nhà hàng</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tên nhà hàng <Text style={styles.required}>*</Text></Text>
            <View style={styles.inputWrapper}>
              <FontAwesome name="home" size={20} color={Color.sub} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={restaurant.name}
                onChangeText={(text) => setRestaurant(prev => ({ ...prev, name: text }))}
                placeholder="Nhập tên nhà hàng"
                placeholderTextColor={Color.sub}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Địa chỉ <Text style={styles.required}>*</Text></Text>
            <View style={styles.inputWrapper}>
              <FontAwesome name="map-marker" size={20} color={Color.sub} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={restaurant.address}
                onChangeText={(text) => setRestaurant(prev => ({ ...prev, address: text }))}
                placeholder="Nhập địa chỉ"
                placeholderTextColor={Color.sub}
              />
            </View>
          </View>

          <View style={styles.timeContainer}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
              <Text style={styles.label}>Giờ mở cửa <Text style={styles.required}>*</Text></Text>
              <View style={styles.inputWrapper}>
                <FontAwesome name="clock-o" size={20} color={Color.sub} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={restaurant.openTime}
                  onChangeText={(text) => setRestaurant(prev => ({ ...prev, openTime: text }))}
                  placeholder="HH:MM"
                  placeholderTextColor={Color.sub}
                />
              </View>
            </View>

            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.label}>Giờ đóng cửa <Text style={styles.required}>*</Text></Text>
              <View style={styles.inputWrapper}>
                <FontAwesome name="clock-o" size={20} color={Color.sub} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={restaurant.closeTime}
                  onChangeText={(text) => setRestaurant(prev => ({ ...prev, closeTime: text }))}
                  placeholder="HH:MM"
                  placeholderTextColor={Color.sub}
                />
              </View>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mô tả</Text>
            <View style={[styles.inputWrapper, styles.textAreaWrapper]}>
              <FontAwesome name="file-text-o" size={20} color={Color.sub} style={[styles.inputIcon, {marginTop: 10}]} />
              <TextInput
                style={[styles.input, styles.textArea]}
                value={restaurant.description}
                onChangeText={(text) => setRestaurant(prev => ({ ...prev, description: text }))}
                placeholder="Nhập mô tả về nhà hàng của bạn"
                placeholderTextColor={Color.sub}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
          </View>

          <Pressable 
            style={[styles.updateButton, loading && styles.disabledButton]} 
            onPress={handleUpdate}
            disabled={loading}
          >
            <FontAwesome name="save" size={20} color={Color.white} style={styles.buttonIcon} />
            <Text style={styles.buttonText}>
              {loading ? "Đang cập nhật..." : "Cập nhật thông tin"}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Color.white,
  },
  container: {
    flex: 1,
  },
  header: {
    padding: wp("5%"),
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp("1%"),
  },
  title: {
    fontSize: wp("6%"),
    color: Color.primary,
    fontFamily: FontFamily.segoeUI,
    fontWeight: "700",
    marginLeft: wp("2%"),
  },
  subtitle: {
    fontSize: wp("3.5%"),
    color: Color.sub,
    fontFamily: FontFamily.segoeUI,
  },
  form: {
    padding: wp("5%"),
  },
  inputGroup: {
    marginBottom: hp("2.5%"),
  },
  label: {
    fontSize: wp("4%"),
    color: Color.secondary,
    fontFamily: FontFamily.segoeUI,
    marginBottom: hp("1%"),
    fontWeight: "600",
  },
  required: {
    color: '#FF3B30',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: Border.br_9xs,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: wp("3%"),
  },
  inputIcon: {
    marginRight: wp("2%"),
  },
  input: {
    flex: 1,
    padding: wp("3%"),
    fontSize: wp("4%"),
    fontFamily: FontFamily.segoeUI,
    color: Color.secondary,
  },
  textAreaWrapper: {
    alignItems: 'flex-start',
    paddingVertical: wp("2%"),
  },
  textArea: {
    height: hp("15%"),
    paddingTop: 0,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  updateButton: {
    backgroundColor: Color.primary,
    borderRadius: Border.br_9xs,
    padding: wp("4%"),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp("2%"),
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonIcon: {
    marginRight: wp("2%"),
  },
  disabledButton: {
    opacity: 0.7,
  },
  buttonText: {
    color: Color.white,
    fontSize: wp("4%"),
    fontFamily: FontFamily.segoeUI,
    fontWeight: "700",
  },
});

export default EditRestaurant; 