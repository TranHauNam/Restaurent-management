import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Pressable, TextInput, Alert, ScrollView } from "react-native";
import { Color, Border, FontSize, FontFamily } from "../../../styles/GlobalStyles";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useRouter } from "expo-router";
import { useAuthContext } from "../../../contexts/auth-context";
import { API_URL } from "../../../services/config";

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
        const response = await fetch('http://192.168.0.100:5001/api/admin/restaurant/update', {
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
      const response = await fetch('http://192.168.0.100:5001/api/admin/restaurant/update', {
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
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Chỉnh sửa thông tin nhà hàng</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Tên nhà hàng *</Text>
          <TextInput
            style={styles.input}
            value={restaurant.name}
            onChangeText={(text) => setRestaurant(prev => ({ ...prev, name: text }))}
            placeholder="Nhập tên nhà hàng"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Địa chỉ *</Text>
          <TextInput
            style={styles.input}
            value={restaurant.address}
            onChangeText={(text) => setRestaurant(prev => ({ ...prev, address: text }))}
            placeholder="Nhập địa chỉ"
          />
        </View>

        <View style={styles.timeContainer}>
          <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
            <Text style={styles.label}>Giờ mở cửa *</Text>
            <TextInput
              style={styles.input}
              value={restaurant.openTime}
              onChangeText={(text) => setRestaurant(prev => ({ ...prev, openTime: text }))}
              placeholder="HH:MM"
            />
          </View>

          <View style={[styles.inputGroup, { flex: 1 }]}>
            <Text style={styles.label}>Giờ đóng cửa *</Text>
            <TextInput
              style={styles.input}
              value={restaurant.closeTime}
              onChangeText={(text) => setRestaurant(prev => ({ ...prev, closeTime: text }))}
              placeholder="HH:MM"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Mô tả</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={restaurant.description}
            onChangeText={(text) => setRestaurant(prev => ({ ...prev, description: text }))}
            placeholder="Nhập mô tả"
            multiline
            numberOfLines={4}
          />
        </View>

        <Pressable 
          style={[styles.updateButton, loading && styles.disabledButton]} 
          onPress={handleUpdate}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Đang cập nhật..." : "Cập nhật thông tin"}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  header: {
    padding: wp("5%"),
    borderBottomWidth: 1,
    borderBottomColor: Color.sub,
  },
  title: {
    fontSize: FontSize.size_xl,
    color: Color.primary,
    fontFamily: FontFamily.segoeUI,
    fontWeight: "700",
  },
  form: {
    padding: wp("5%"),
  },
  inputGroup: {
    marginBottom: hp("2%"),
  },
  label: {
    fontSize: FontSize.size_sm,
    color: Color.secondary,
    fontFamily: FontFamily.segoeUI,
    marginBottom: hp("1%"),
  },
  input: {
    borderWidth: 1,
    borderColor: Color.sub,
    borderRadius: Border.br_9xs,
    padding: wp("3%"),
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.segoeUI,
  },
  textArea: {
    height: hp("15%"),
    textAlignVertical: "top",
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  updateButton: {
    backgroundColor: Color.primary,
    borderRadius: Border.br_9xs,
    padding: wp("4%"),
    alignItems: "center",
    marginTop: hp("2%"),
  },
  disabledButton: {
    opacity: 0.7,
  },
  buttonText: {
    color: Color.white,
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.segoeUI,
    fontWeight: "700",
  },
});

export default EditRestaurant; 